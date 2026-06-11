import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InboxPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cls_auth") !== "admin") {
      navigate("/client-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("cls_auth");
    navigate("/");
  };

  const iframeSrc = "https://portal.completelawsupport.com/Inbox?back=https://completelawsupport.com/client-login";

  return (
    <div className="h-screen bg-white font-sans flex flex-col overflow-hidden relative">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white shrink-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-start justify-center leading-none">
              <div className="text-[12px] font-medium tracking-[0.3em] text-neutral-900">CLS</div>
              <div className="mt-1.5 h-[1.5px] w-7 bg-blue-600" />
            </div>
            <div className="h-6 w-px bg-neutral-100" />
            <div className="text-[13px] font-normal tracking-[0.12em] text-neutral-900">
              Complete Law Support
            </div>
            <div className="h-6 w-px bg-neutral-100 hidden sm:block" />
            <div className="text-[11px] font-bold text-blue-600 tracking-wider uppercase hidden sm:block bg-blue-50 px-2 py-0.5 rounded">
              Submissions Admin
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-700 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Embed Submissions Inbox */}
      <div className="flex-1 w-full relative bg-slate-50">
        <iframe
          src={iframeSrc}
          title="Submissions Inbox"
          className="absolute inset-0 w-full h-full border-none"
          allow="print; download"
        />
      </div>
    </div>
  );
}
