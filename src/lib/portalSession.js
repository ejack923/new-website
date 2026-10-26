import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Sign-in is the portal's own. Its /api/auth endpoints accept requests from this site and
// keep the session in HttpOnly cookies on portal.completelawsupport.com, so the same session
// is used by the framed portal pages. This site keeps no passwords and no sign-in state of
// its own: it only asks the portal who is signed in.
export const PORTAL_ORIGIN = "https://portal.completelawsupport.com";

const PORTAL_KEYS = ["admin", "eas", "vals", "lacw", "jbl", "rga", "counsel"];

async function portalAuth(path, options = {}) {
  return fetch(`${PORTAL_ORIGIN}/api/auth/${path}`, {
    credentials: "include",
    cache: "no-store",
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
}

// Returns the signed-in user, or null when nobody is signed in.
// Throws when the portal cannot be reached.
export async function getPortalUser() {
  const res = await portalAuth("me");
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Sign-in service unavailable");
  const body = await res.json();
  return body.user || null;
}

const UNAVAILABLE_MSG = "The sign-in service could not be reached. Please try again shortly.";

export async function signInToPortal(email, password) {
  let res;
  try {
    res = await portalAuth("login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error(UNAVAILABLE_MSG);
  }
  if (res.ok) return (await res.json()).user;
  if (res.status === 401 || res.status === 400) {
    const err = new Error("Invalid email address or password. Please try again.");
    err.invalid = true;
    throw err;
  }
  throw new Error(UNAVAILABLE_MSG);
}

export async function signOutOfPortal() {
  try {
    await portalAuth("logout", { method: "POST" });
  } catch {
    // Signing out of a portal we cannot reach leaves nothing to clear here.
  }
}

// The website page a user lands on after signing in, or null if their account has no portal yet.
export function homePathFor(user) {
  if (!user) return null;
  if (user.role === "admin" || user.portal === "admin") return "/admin-portal";
  return PORTAL_KEYS.includes(user.portal) ? `/${user.portal}-portal` : null;
}

export function canOpenPortal(user, portalKey) {
  if (!user) return false;
  if (user.role === "admin" || user.portal === "admin") return true;
  return user.portal === portalKey;
}

// Gate for the portal wrapper pages. Sends anyone not signed in to /client-login (and back
// here afterwards), and anyone signed in to another firm's portal to their own.
export function usePortalGate(portalKey) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const toLogin = () => {
      sessionStorage.setItem("login_redirect", window.location.pathname + window.location.search);
      navigate("/client-login", { replace: true });
    };
    getPortalUser()
      .then((u) => {
        if (cancelled) return;
        if (!u) {
          toLogin();
        } else if (!canOpenPortal(u, portalKey)) {
          navigate(homePathFor(u) || "/client-login", { replace: true });
        } else {
          setUser(u);
        }
      })
      .catch(() => {
        if (!cancelled) toLogin();
      });
    return () => {
      cancelled = true;
    };
  }, [navigate, portalKey]);

  const signOut = async () => {
    await signOutOfPortal();
    navigate("/");
  };

  return { user, ready: !!user, isAdmin: !!user && canOpenPortal(user, "admin"), signOut };
}
