import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPortalUser, homePathFor, signInToPortal } from "../lib/portalSession";

const NO_PORTAL_MSG = "Your account is not linked to a firm portal yet. Please contact Complete Law Support.";

export default function ClientLogin() {
  const navigate = useNavigate();

  // Mode states
  const [isRegistering, setIsRegistering] = useState(false);

  // Login inputs
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Access request inputs
  const [regFirmName, setRegFirmName] = useState("");
  const [regEmail, setRegEmail] = useState("");

  // Feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goToPortal = (user) => {
    const home = homePathFor(user);
    if (!home) {
      setErrorMsg(NO_PORTAL_MSG);
      return;
    }
    const redirect = sessionStorage.getItem("login_redirect");
    sessionStorage.removeItem("login_redirect");
    navigate(redirect || home);
  };

  useEffect(() => {
    // Passwords used to be kept here in plain text by the old sign-in; remove any left behind.
    try {
      localStorage.removeItem("cls_users");
      sessionStorage.removeItem("cls_auth");
    } catch {
      // Storage may be blocked; nothing to clear then.
    }

    if (new URLSearchParams(window.location.search).get("setup") === "true") {
      setIsRegistering(true);
    }

    // Already signed in to the portal: go straight there.
    getPortalUser()
      .then((user) => {
        if (user && homePathFor(user)) goToPortal(user);
      })
      .catch(() => {});
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);
    try {
      const user = await signInToPortal(emailInput.trim().toLowerCase(), passwordInput);
      goToPortal(user);
    } catch (err) {
      setErrorMsg(err.message);
      if (err.invalid) setPasswordInput("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send-signup-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: regEmail.trim().toLowerCase(),
          firmName: regFirmName.trim(),
        }),
      });
      if (!res.ok) throw new Error("Your request could not be sent. Please email us instead.");
      setSuccessMsg("Request sent. We will set up your account and email you when it is ready.");
      setRegEmail("");
      setRegFirmName("");
    } catch (err) {
      setErrorMsg(err.message || "Your request could not be sent. Please email us instead.");
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
            {isRegistering ? "Request Access" : "Client Access"}
          </p>
          <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />
          <h1 className="text-3xl font-semibold text-neutral-900">
            {isRegistering ? "Request access" : "Sign in"}
          </h1>
          <p className="mt-3 text-sm text-neutral-500 leading-6">
            {isRegistering
              ? "Tell us your firm and email address and we will set up your account."
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
                    autoComplete="username"
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
                    autoComplete="current-password"
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
                <span className="text-neutral-500">No account yet? </span>
                <button
                  type="button"
                  onClick={() => { setIsRegistering(true); clearFormStates(); }}
                  className="font-medium text-blue-600 hover:underline hover:text-blue-700"
                >
                  Request access
                </button>
              </div>
            </div>
          ) : (
            /* REQUEST ACCESS VIEW */
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
                    className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                    required
                    autoFocus
                  />
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
                    className="w-full border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600"
                    required
                  />
                  <p className="mt-1 text-[11px] text-neutral-400">
                    We will set up your account and email you how to sign in.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-blue-600 py-3 mt-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending request..." : "Request access"}
                </button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-neutral-500">Already have an account? </span>
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
