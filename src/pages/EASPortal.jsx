import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EASPortal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("cls_auth");
    if (auth !== "eas" && auth !== "admin") {
      navigate("/client-login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === "DRAG_ENTER") {
        setIsDragging(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("cls_auth");
    navigate("/");
  };

  const currentPath = location.pathname;
  const currentSearch = location.search;
  const iframeSrc = `https://portal.completelawsupport.com${currentPath}${currentSearch}${currentSearch ? '&' : '?'}back=https://completelawsupport.com/eas-portal`;

  return (
    <div 
      className="h-screen bg-white font-sans flex flex-col overflow-hidden relative"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
    >
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
          <div className="flex items-center gap-4">
            {sessionStorage.getItem("cls_auth") === "admin" && (
              <button
                onClick={() => navigate("/admin-portal")}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                ← Back to Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-neutral-500 hover:text-neutral-700 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Embed EAS Portal Tools Dashboard */}
      <div className="flex-1 w-full relative bg-white">
        <iframe
          src={iframeSrc}
          title="EAS Portal"
          className="absolute inset-0 w-full h-full border-none"
          allow="print; clipboard-write"
        />
      </div>

      {isDragging && (
        <div 
          className="absolute inset-0 bg-neutral-900/60 z-50 flex flex-col items-center justify-center text-white border-4 border-dashed border-blue-500 m-4 rounded-2xl transition-all"
          onDragLeave={() => setIsDragging(false)}
          onDrop={async (e) => {
            e.preventDefault();
            setIsDragging(false);

            const items = Array.from(e.dataTransfer.items || []);
            const filesList = Array.from(e.dataTransfer.files || []);

            if (items.length === 0 && filesList.length === 0) return;

            const scanFiles = async (entry, path = "") => {
              if (entry.isFile) {
                try {
                  const file = await new Promise((resolve, reject) => {
                    entry.file(resolve, reject);
                  });
                  return [{ file, path: path ? `${path}/${file.name}` : file.name }];
                } catch (err) {
                  return [];
                }
              } else if (entry.isDirectory) {
                try {
                  const dirReader = entry.createReader();
                  const readAllEntries = async () => {
                    let allEntries = [];
                    const readBatch = () => {
                      return new Promise((resolve) => {
                        dirReader.readEntries((entries) => {
                          resolve(entries || []);
                        }, () => resolve([]));
                      });
                    };
                    let batch = await readBatch();
                    while (batch && batch.length > 0) {
                      allEntries.push(...batch);
                      batch = await readBatch();
                    }
                    return allEntries;
                  };
                  const entries = await readAllEntries();
                  const files = [];
                  for (const subEntry of entries) {
                    const subFiles = await scanFiles(subEntry, path ? `${path}/${entry.name}` : entry.name);
                    files.push(...subFiles);
                  }
                  return files;
                } catch (err) {
                  return [];
                }
              }
              return [];
            };

            let scanned = [];
            if (items.length > 0) {
              const filePromises = items.map(async (item) => {
                if (item.kind === "file") {
                  try {
                    const entry = item.webkitGetAsEntry();
                    if (entry) return await scanFiles(entry);
                  } catch (err) {
                    console.error(err);
                  }
                }
                return [];
              });
              const results = await Promise.all(filePromises);
              scanned = results.flat();
            }

            if (scanned.length === 0 && filesList.length > 0) {
              scanned = filesList.map(file => ({
                file,
                path: file.name
              }));
            }

            if (scanned.length > 0) {
              const iframe = document.querySelector("iframe");
              if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({
                  type: "DROP_FILES",
                  files: scanned
                }, "*");
              }
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            try {
              e.dataTransfer.dropEffect = 'copy';
            } catch (err) {}
          }}
        >
          <div className="text-center p-6 bg-neutral-900/80 rounded-xl max-w-sm pointer-events-none">
            <svg className="mx-auto h-12 w-12 text-blue-400 mb-3 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm font-bold">Drop SharePoint Folders or Files Here</p>
            <p className="text-xs text-neutral-400 mt-1">They will be automatically uploaded to the portal</p>
          </div>
        </div>
      )}
    </div>
  );
}
