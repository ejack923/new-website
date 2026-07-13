import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Standard hardcoded firm codes for mapping registration and fallback logins
const EAS_CODES = ["easlegal2025", "eas", "eas2025", "easlegal"];
const VALS_CODES = ["vals2025", "vals"];
const LACW_CODES = ["lacw2025", "lacwlegal2025", "lacw", "lac"];
const JBL_CODES = ["jblaw2025", "jbl", "jarrod"];
const RGA_CODES = ["rga2026", "rga", "robyn", "greensill"];
const ADMIN_CODES = ["admin", "emma", "clsadmin", "clsadmin2026"];
const COUNSEL_CODES = ["counsel", "counsel2026", "barrister", "advocate"];

// Default built-in accounts for admin and firms
const DEFAULT_ACCOUNTS = [
  { email: "admin@completelawsupport.com.au", username: "admin", password: "clsadmin2026", portal: "admin" },
  { email: "emma@completelawsupport.com.au", username: "emma", password: "emma", portal: "admin" },
  { email: "eas@completelawsupport.com.au", username: "eas", password: "EASLegal2025", portal: "eas" },
  { email: "vals@completelawsupport.com.au", username: "vals", password: "VALS2025", portal: "vals" },
  { email: "lacw@completelawsupport.com.au", username: "lacw", password: "LACW2025", portal: "lacw" },
  { email: "jbl@completelawsupport.com.au", username: "jbl", password: "JBLaw2025", portal: "jbl" },
  { email: "rga@completelawsupport.com.au", username: "rga", password: "RGAPortal2026", portal: "rga" },
  { email: "counsel@completelawsupport.com.au", username: "counsel", password: "CounselPortal2026", portal: "counsel" }
];

// Helper to generate a valid, deterministic UUID from a string (such as an email address)
function getDeterministicUuid(str) {
  let h1 = 0x811c9dc5;
  let h2 = 0xcbf29ce4;
  for (let i = 0; i < str.length; i++) {
    h1 = Math.imul(h1 ^ str.charCodeAt(i), 16777619);
    h2 = Math.imul(h2 ^ str.charCodeAt(i), 1099511628211);
  }
  const hex1 = Math.abs(h1).toString(16).padStart(8, "0");
  const hex2 = Math.abs(h2).toString(16).padStart(8, "0");
  const hex3 = Math.abs(h1 ^ h2).toString(16).padStart(8, "0");
  const hex4 = Math.abs(h1 & h2).toString(16).padStart(8, "0");
  const hex = (hex1 + hex2 + hex3 + hex4).padEnd(32, "a");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export default function ClientLogin() {
  const navigate = useNavigate();

  // Mode states
  const [isRegistering, setIsRegistering] = useState(false);

  // Login inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Registration inputs
  const [regFirmName, setRegFirmName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to map portal key to list of codes for backwards compatibility
  const getPortalFromCode = (code) => {
    const normalized = code.trim().toLowerCase();
    if (EAS_CODES.includes(normalized)) return "eas";
    if (VALS_CODES.includes(normalized)) return "vals";
    if (LACW_CODES.includes(normalized)) return "lacw";
    if (JBL_CODES.includes(normalized)) return "jbl";
    if (RGA_CODES.includes(normalized)) return "rga";
    if (COUNSEL_CODES.includes(normalized)) return "counsel";
    if (ADMIN_CODES.includes(normalized)) return "admin";
    return null;
  };

  // Check for query parameters (setup, action, email, portal)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("setup") === "true") {
      setIsRegistering(true);
    }

    const action = params.get("action");
    const email = params.get("email");
    const portal = params.get("portal");

    if (action && email) {
      handleAdminAction(action, email, portal);
    }
  }, []);

  const handleAdminAction = async (action, email, portal) => {
    setErrorMsg("");
    setSuccessMsg("Processing administrator action...");
    
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const draftId = getDeterministicUuid(normalizedEmail);
      
      // Fetch the signup request draft
      const getRes = await fetch(`https://portal.completelawsupport.com/api/vals-drafts?id=${encodeURIComponent(draftId)}`);
      if (!getRes.ok) {
        throw new Error("Signup request not found in database.");
      }
      const draft = await getRes.json();
      
      if (!draft.form_data) {
        throw new Error("Invalid draft structure.");
      }
      
      const updatedFormData = {
        ...draft.form_data,
        status: action === "approve" ? "approved" : "rejected",
        portal: action === "approve" ? portal : null
      };
      
      // PATCH draft in database
      const patchRes = await fetch(`https://portal.completelawsupport.com/api/vals-drafts?id=${encodeURIComponent(draftId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_data: updatedFormData
        })
      });
      
      if (!patchRes.ok) {
        throw new Error("Failed to update database.");
      }
      
      if (action === "approve") {
        setSuccessMsg(`Successfully approved ${normalizedEmail} for portal: ${portal.toUpperCase()}`);
      } else {
        setSuccessMsg(`Successfully rejected signup request for ${normalizedEmail}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to process admin action.");
    }
  };

  // Retrieve existing users from localStorage
  const getUsers = () => {
    try {
      const users = localStorage.getItem("cls_users");
      return users ? JSON.parse(users) : [];
    } catch (e) {
      console.error("Failed to parse cls_users:", e);
      return [];
    }
  };

  // Persist new user to localStorage
  const saveUser = (user) => {
    try {
      const users = getUsers();
      users.push(user);
      localStorage.setItem("cls_users", JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save user:", e);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const normalizedEmail = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    setIsSubmitting(true);
    try {
      // 1. Check default built-in accounts
      const matchedDefault = DEFAULT_ACCOUNTS.find(
        (acc) => 
          (normalizedEmail === acc.email || normalizedEmail === acc.username) && 
          password === acc.password
      );

      if (matchedDefault) {
        sessionStorage.setItem("cls_auth", matchedDefault.portal);
        const redirect = sessionStorage.getItem("login_redirect");
        sessionStorage.removeItem("login_redirect");
        if (redirect) {
          navigate(redirect);
        } else {
          navigate(`/${matchedDefault.portal}-portal`);
        }
        return;
      }

      // 2. Check draft database for signup_request
      const draftId = getDeterministicUuid(normalizedEmail);
      const checkRes = await fetch(`https://portal.completelawsupport.com/api/vals-drafts?id=${encodeURIComponent(draftId)}`);
      
      if (checkRes.ok) {
        const dbUser = await checkRes.json();
        if (dbUser && dbUser.form_data && dbUser.form_data.email.toLowerCase() === normalizedEmail) {
          const { status, password: dbPassword, portal } = dbUser.form_data;
          
          if (status === "pending") {
            setErrorMsg("Your registration is pending approval by the administrator.");
            setIsSubmitting(false);
            return;
          }
          
          if (status === "rejected") {
            setErrorMsg("Your registration request was declined. Please contact support.");
            setIsSubmitting(false);
            return;
          }
          
          if (status === "approved") {
            if (dbPassword === password) {
              // Cache locally
              const newUser = {
                email: normalizedEmail,
                password: password,
                portal: portal
              };
              saveUser(newUser);

              sessionStorage.setItem("cls_auth", portal);
              const redirect = sessionStorage.getItem("login_redirect");
              sessionStorage.removeItem("login_redirect");
              if (redirect) {
                navigate(redirect);
              } else {
                navigate(`/${portal}-portal`);
              }
              return;
            } else {
              setErrorMsg("Invalid email address or password. Please try again.");
              setPasswordInput("");
              setIsSubmitting(false);
              return;
            }
          }
        }
      }

      // 3. Fallback: Check local registered credentials in localStorage
      const users = getUsers();
      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (matchedUser) {
        sessionStorage.setItem("cls_auth", matchedUser.portal);
        const redirect = sessionStorage.getItem("login_redirect");
        sessionStorage.removeItem("login_redirect");
        if (redirect) {
          navigate(redirect);
        } else {
          navigate(`/${matchedUser.portal}-portal`);
        }
      } else {
        setErrorMsg("Invalid email address or password. Please try again.");
        setPasswordInput("");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Connection error verifying credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const normalizedEmail = regEmail.trim().toLowerCase();
    const firmName = regFirmName.trim();

    // Validate passwords match
    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Validate password length
    if (regPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      const matchedDefault = DEFAULT_ACCOUNTS.find(acc => acc.email === normalizedEmail);
      if (matchedDefault) {
        setErrorMsg("This email address is a system default account.");
        setIsSubmitting(false);
        return;
      }

      // Check draft database first to see if they already submitted a request
      const draftId = getDeterministicUuid(normalizedEmail);
      const checkRes = await fetch(`https://portal.completelawsupport.com/api/vals-drafts?id=${encodeURIComponent(draftId)}`);
      
      if (checkRes.ok) {
        const existingDraft = await checkRes.json();
        if (existingDraft && existingDraft.form_data) {
          if (existingDraft.form_data.status === "pending") {
            setErrorMsg("A signup request is already pending for this email address.");
            setIsSubmitting(false);
            return;
          }
          if (existingDraft.form_data.status === "approved") {
            setErrorMsg("This email address is already approved. Please sign in.");
            setIsSubmitting(false);
            return;
          }
        }
      }

      // Save registration request as a draft in shared database
      const payload = {
        id: draftId,
        form_type: 'signup_request',
        draft_name: `Signup Request: ${normalizedEmail}`,
        brand: 'all',
        form_data: {
          email: normalizedEmail,
          password: regPassword,
          firm_name: firmName,
          status: 'pending',
          portal: null
        }
      };

      const res = await fetch('https://portal.completelawsupport.com/api/vals-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to save signup request to database.");
      }

      // Send approval email notification to Emma via our serverless endpoint
      const emailRes = await fetch('/api/send-signup-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: normalizedEmail,
          firmName: firmName
        })
      });

      if (!emailRes.ok) {
        console.warn("Email alert failed to send.");
      }

      setSuccessMsg("Account request submitted! An approval email has been sent to ejackson@completelawsupport.com.");
      
      // Clear forms
      setRegEmail("");
      setRegPassword("");
      setRegConfirmPassword("");
      setRegFirmName("");
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit registration request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFormStates = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setEmailInput("");
    setPasswordInput("");
    setRegFirmName("");
    setRegEmail("");
    setRegPassword("");
    setRegConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-start justify-center leading-none">
              <div className="text-[12px] font-medium tracking-[0.3em] text-neutral-900">CLS</div>
              <div className="mt-1.5 h-[1.5px] w-7 bg-blue-600" />
            </div>
            <div className="h-6 w-px bg-neutral-100" />
            <div className="text-[13px] font-normal tracking-[0.12em] text-neutral-900">
              Complete Law Support
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition"
          >
            ← Back
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">
            {isRegistering ? "Client Registration" : "Client Access"}
          </p>
          <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />
          <h1 className="text-3xl font-semibold text-neutral-900">
            {isRegistering ? "Set up Account" : "Sign in"}
          </h1>
          <p className="mt-3 text-sm text-neutral-500 leading-6">
            {isRegistering
              ? "Create your personal login and password by entering your firm name."
              : "Enter your personal email and password to reach the client portal."}
          </p>

          {/* Feedback Messages */}
          <div className="mt-6">
            {errorMsg && (
              <div className="mb-4 rounded-lg bg-red-50 p-3.5 text-xs text-red-700 border border-red-150 flex items-start gap-2.5">
                <svg className="h-4 w-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 rounded-lg bg-green-50 p-3.5 text-xs text-green-700 border border-green-200 flex items-start gap-2.5">
                <svg className="h-4 w-4 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{successMsg}</span>
              </div>
            )}
          </div>

          {!isRegistering ? (
            /* SIGN IN VIEW */
            <div className="mt-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => { setEmailInput(e.target.value); setErrorMsg(""); }}
                    placeholder="Enter email address"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => { setPasswordInput(e.target.value); setErrorMsg(""); }}
                    placeholder="Enter password"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-blue-600 py-3 mt-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Verifying..." : "Sign in"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-neutral-500">First time logging in? </span>
                <button
                  type="button"
                  onClick={() => { setIsRegistering(true); clearFormStates(); }}
                  className="font-medium text-blue-600 hover:underline hover:text-blue-700"
                >
                  Set up your account
                </button>
              </div>
            </div>
          ) : (
            /* REGISTER / SETUP VIEW */
            <div className="mt-8">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Which firm are you part of?
                  </label>
                  <input
                    type="text"
                    value={regFirmName}
                    onChange={(e) => { setRegFirmName(e.target.value); setErrorMsg(""); }}
                    placeholder="Enter your firm name"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg && errorMsg.includes("firm") ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                    autoFocus
                  />
                  <p className="mt-1 text-[11px] text-neutral-400">
                    Your request will be submitted to the administrator for approval.
                  </p>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => { setRegEmail(e.target.value); setErrorMsg(""); }}
                    placeholder="Enter your email address"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg && errorMsg.includes("email") ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => { setRegPassword(e.target.value); setErrorMsg(""); }}
                    placeholder="Create a password (min 6 characters)"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg && errorMsg.includes("Password") ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => { setRegConfirmPassword(e.target.value); setErrorMsg(""); }}
                    placeholder="Confirm your password"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg && errorMsg.includes("match") ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-blue-600 py-3 mt-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting request..." : "Set up Account"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-neutral-500">Already set up your account? </span>
                <button
                  type="button"
                  onClick={() => { setIsRegistering(false); clearFormStates(); }}
                  className="font-medium text-blue-600 hover:underline hover:text-blue-700"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          <p className="mt-8 text-xs text-neutral-400 text-center">
            For access, contact{" "}
            <a href="mailto:hello@completelawsupport.com.au" className="underline hover:text-neutral-600">
              hello@completelawsupport.com.au
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
