import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PASSWORD = "EASLegal2025";

export default function ClientLogin() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem("cls_auth", "true");
      navigate("/client-portal");
    } else {
      setError(true);
      setInput("");
    }
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

      {/* Login Form */}
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">Client Access</p>
          <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />
          <h1 className="text-3xl font-semibold text-neutral-900">Sign in</h1>
          <p className="mt-3 text-sm text-neutral-500 leading-6">
            Enter your access code to reach the client portal.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-neutral-500 mb-2">
                Access Code
              </label>
              <input
                type="password"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(false); }}
                placeholder="Enter access code"
                className={`w-full border px-4 py-3 text-sm outline-none transition focus:border-blue-600 ${
                  error ? "border-red-400 bg-red-50" : "border-neutral-200"
                }`}
                required
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs text-red-500">Incorrect access code. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Sign in
            </button>
          </form>

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
