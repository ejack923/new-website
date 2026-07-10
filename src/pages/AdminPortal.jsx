import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("cls_auth") !== "admin") {
      navigate("/client-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("cls_auth");
    navigate("/");
  };

  const currentPath = location.pathname;
  const currentSearch = location.search;
  const iframeSrc = `https://portal.completelawsupport.com${currentPath}${currentSearch}${currentSearch ? '&' : '?'}back=https://completelawsupport.com/admin-portal`;

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
            <div className="text-[11px] font-bold text-blue-650 tracking-wider uppercase hidden sm:block bg-blue-50 px-2 py-0.5 rounded">
              Submissions Admin
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Access Client Portals Dropdown */}
            <div className="relative">
              <button 
                type="button" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-neutral-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-neutral-750 transition"
              >
                <span>Access Client Portals</span>
                <svg className="h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-1 w-44 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-50">
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/eas-portal"); }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 transition font-medium"
                    >
                      EAS Client Portal
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/vals-portal"); }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 transition font-medium"
                    >
                      VALS Client Portal
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/lacw-portal"); }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 transition font-medium"
                    >
                      LACW Client Portal
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/jbl-portal"); }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 transition font-medium"
                    >
                      JBL Client Portal
                    </button>
                    <button
                      onClick={() => { setDropdownOpen(false); navigate("/rga-portal"); }}
                      className="w-full text-left px-4 py-2 text-xs text-neutral-700 hover:bg-neutral-50 transition font-medium"
                    >
                      RGA Client Portal
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-neutral-500 hover:text-neutral-700 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Embed Admin Portal Tools Dashboard */}
      <div className="flex-1 w-full relative bg-white">
        <iframe
          src={iframeSrc}
          title="Admin Portal"
          className="absolute inset-0 w-full h-full border-none"
          allow="print; clipboard-write"
        />
      </div>
    </div>
  );
}
