import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Standard hardcoded firm codes for mapping registration and fallback logins
const EAS_CODES = ["easlegal2025", "eas", "eas2025", "easlegal"];
const VALS_CODES = ["vals2025", "vals"];
const LACW_CODES = ["lacw2025", "lacwlegal2025", "lacw", "lac"];
const JBL_CODES = ["jblaw2025", "jbl", "jarrod"];
const ADMIN_CODES = ["admin", "emma", "clsadmin", "clsadmin2026"];

export default function ClientLogin() {
  const navigate = useNavigate();

  // Mode states
  const [isRegistering, setIsRegistering] = useState(false);

  // Login inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Registration inputs
  const [regFirmCode, setRegFirmCode] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Check for deep-linked setup query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("setup") === "true") {
      setIsRegistering(true);
    }
  }, []);

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

  // Helper to map code to portal key
  const getPortalFromCode = (code) => {
    const normalized = code.trim().toLowerCase();
    if (EAS_CODES.includes(normalized)) return "eas";
    if (VALS_CODES.includes(normalized)) return "vals";
    if (LACW_CODES.includes(normalized)) return "lacw";
    if (JBL_CODES.includes(normalized)) return "jbl";
    if (ADMIN_CODES.includes(normalized)) return "admin";
    return null;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Check registered credentials in localStorage
    const normalizedEmail = emailInput.trim().toLowerCase();
    const users = getUsers();
    const matchedUser = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === passwordInput
    );

    if (matchedUser) {
      sessionStorage.setItem("cls_auth", matchedUser.portal);
      navigate(`/${matchedUser.portal}-portal`);
    } else {
      setErrorMsg("Invalid email address or password. Please try again.");
      setPasswordInput("");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const normalizedEmail = regEmail.trim().toLowerCase();

    // Validate Firm Access Code
    const portal = getPortalFromCode(regFirmCode);
    if (!portal) {
      setErrorMsg("Invalid Firm Access Code. Please enter a valid code provided by your firm.");
      return;
    }

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

    // Check if email already registered
    const users = getUsers();
    const emailExists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (emailExists) {
      setErrorMsg("This email address is already registered.");
      return;
    }

    // Register user
    const newUser = {
      email: normalizedEmail,
      password: regPassword,
      portal: portal,
    };
    saveUser(newUser);

    setSuccessMsg("Account registered successfully! Logging you in...");

    // Auto log in after 1.5 seconds
    setTimeout(() => {
      sessionStorage.setItem("cls_auth", portal);
      navigate(`/${portal}-portal`);
    }, 1500);
  };

  const clearFormStates = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setEmailInput("");
    setPasswordInput("");
    setRegFirmCode("");
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
              ? "Create your personal login and password using your firm's access code."
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
                  className="w-full rounded-full bg-blue-600 py-3 mt-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Sign in
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
                    Firm Access Code
                  </label>
                  <input
                    type="password"
                    value={regFirmCode}
                    onChange={(e) => { setRegFirmCode(e.target.value); setErrorMsg(""); }}
                    placeholder="Enter your initial access code"
                    className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                      errorMsg && errorMsg.includes("Access Code") ? "border-red-400 bg-red-50" : "border-neutral-200"
                    }`}
                    required
                    autoFocus
                  />
                  <p className="mt-1 text-[11px] text-neutral-400">
                    Used to authenticate and link your account to your firm's portal.
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
                  className="w-full rounded-full bg-blue-600 py-3 mt-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Set up Account
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
