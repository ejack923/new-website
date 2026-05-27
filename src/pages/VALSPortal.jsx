import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VALSPortal() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("cls_auth") !== "vals") {
      navigate("/client-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("cls_auth");
    navigate("/");
  };

  return (
    <div className="h-screen bg-white font-sans flex flex-col overflow-hidden">
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
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Embed VALS Portal Tools Dashboard */}
      <div className="flex-1 w-full relative bg-white">
        <iframe
          src="https://emma-frontend-blush.vercel.app/vals-portal?back=https://completelawsupport.com/vals-portal"
          title="VALS Portal"
          className="absolute inset-0 w-full h-full border-none"
          allow="print"
        />
      </div>
    </div>
  );
}
