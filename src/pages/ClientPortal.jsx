import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cls_auth") !== "true") {
      navigate("/client-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("cls_auth");
    navigate("/");
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
            onClick={handleLogout}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Portal Content */}
      <main className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-10">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-500">Client Portal</p>
        <div className="mb-6 h-[1.5px] w-12 bg-blue-600" />
        <h1 className="text-3xl font-semibold text-neutral-900">Your Tools</h1>
        <p className="mt-3 text-sm text-neutral-500 leading-6">
          Access your workflow tools and resources below.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Certification Form Card */}
          <a
            href="https://eas-certsheet.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-neutral-200 p-6 transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center bg-blue-50 text-blue-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
            </div>
            <h2 className="text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition">
              Guideline Certification Form
            </h2>
            <p className="mt-2 text-sm text-neutral-500 leading-6">
              Complete and export VLA guideline compliance certificates for your matters.
            </p>
            <p className="mt-4 text-xs font-medium text-blue-600">Open tool →</p>
          </a>
        </div>
      </main>
    </div>
  );
}
