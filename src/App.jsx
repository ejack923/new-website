import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ComingSoon from "./pages/ComingSoon";
import ClientLogin from "./pages/ClientLogin";
import EASPortal from "./pages/EASPortal";
import VALSPortal from "./pages/VALSPortal";
import LACWPortal from "./pages/LACWPortal";
import JBLPortal from "./pages/JBLPortal";
import EASCertification from "./pages/EASCertification";
import VALSCertification from "./pages/VALSCertification";
import AdminPortal from "./pages/AdminPortal";
import RGAPortal from "./pages/RGAPortal";


export default function App() {
  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return;

      if (event.data.type === "PORTAL_NAVIGATE" && event.data.path) {
        try {
          window.history.pushState(null, "", event.data.path);
        } catch (e) {
          console.error("Failed to pushState in parent window:", e);
        }
      } else if (event.data.type === "LOCAL_STORAGE_READY") {
        try {
          const storageData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            storageData[key] = localStorage.getItem(key);
          }
          if (event.source) {
            event.source.postMessage({ type: "LOCAL_STORAGE_INIT", data: storageData }, "*");
          }
        } catch (e) {
          console.error("Failed to compile localStorage init payload:", e);
        }
      } else if (event.data.type === "LOCAL_STORAGE_SET" && event.data.key) {
        try {
          localStorage.setItem(event.data.key, event.data.value);
        } catch (e) {
          console.error("Failed to set localStorage in parent window:", e);
        }
      } else if (event.data.type === "LOCAL_STORAGE_REMOVE" && event.data.key) {
        try {
          localStorage.removeItem(event.data.key);
        } catch (e) {
          console.error("Failed to remove localStorage in parent window:", e);
        }
      } else if (event.data.type === "LOCAL_STORAGE_CLEAR") {
        try {
          localStorage.clear();
        } catch (e) {
          console.error("Failed to clear localStorage in parent window:", e);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
      <Route path="/client-login" element={<ClientLogin />} />
      
      {/* EAS Portal routes */}
      <Route path="/eas-portal" element={<EASPortal />} />
      <Route path="/eas-certification" element={<EASPortal />} />
      <Route path="/eas-aidapplication" element={<EASPortal />} />
      <Route path="/eas-applyforaid" element={<EASPortal />} />

      {/* VALS Portal routes */}
      <Route path="/vals-portal" element={<VALSPortal />} />
      <Route path="/vals-certification" element={<VALSPortal />} />
      <Route path="/vals-aidapplication" element={<VALSPortal />} />
      <Route path="/vals-applyforaid" element={<VALSPortal />} />
      <Route path="/vals-intake" element={<VALSPortal />} />
      <Route path="/vals-authority" element={<VALSPortal />} />
      <Route path="/vals-backsheet" element={<VALSPortal />} />
      <Route path="/vals-medicalworksheet" element={<VALSPortal />} />
      <Route path="/vals-memoprecedent" element={<VALSPortal />} />

      {/* LACW Portal routes */}
      <Route path="/lacw-portal" element={<LACWPortal />} />
      <Route path="/lacw-certification" element={<LACWPortal />} />
      <Route path="/lacw-aidapplication" element={<LACWPortal />} />
      <Route path="/lacw-applyforaid" element={<LACWPortal />} />
      <Route path="/lacw-intake" element={<LACWPortal />} />
      <Route path="/lacw-backsheet" element={<LACWPortal />} />
      <Route path="/lacw-medicalworksheet" element={<LACWPortal />} />
      <Route path="/lacw-memoprecedent" element={<LACWPortal />} />
      <Route path="/lacw-travelclaim" element={<LACWPortal />} />
      <Route path="/lacw-billing" element={<LACWPortal />} />

      {/* JBL Portal routes */}
      <Route path="/jbl-portal" element={<JBLPortal />} />
      <Route path="/jbl-certification" element={<JBLPortal />} />
      <Route path="/jbl-aidapplication" element={<JBLPortal />} />
      <Route path="/jbl-applyforaid" element={<JBLPortal />} />
      <Route path="/jbl-intake" element={<JBLPortal />} />
      <Route path="/jbl-authority" element={<JBLPortal />} />
      <Route path="/jbl-backsheet" element={<JBLPortal />} />
      <Route path="/jbl-medicalworksheet" element={<JBLPortal />} />
      <Route path="/jbl-memoprecedent" element={<JBLPortal />} />
      <Route path="/jbl-conflictcheck" element={<JBLPortal />} />
      <Route path="/jbl-audit-manager" element={<JBLPortal />} />

      {/* RGA Portal routes */}
      <Route path="/rga-portal" element={<RGAPortal />} />
      <Route path="/rga-matter-workspace" element={<RGAPortal />} />
      <Route path="/rga-certification" element={<RGAPortal />} />
      <Route path="/rga-aidapplication" element={<RGAPortal />} />
      <Route path="/rga-applyforaid" element={<RGAPortal />} />
      <Route path="/rga-medicalworksheet" element={<RGAPortal />} />
      <Route path="/rga-memoprecedent" element={<RGAPortal />} />


      <Route path="/EASLegalCertification" element={<EASCertification />} />
      <Route path="/VALSCertification" element={<VALSCertification />} />
      <Route path="/admin-portal" element={<AdminPortal />} />
      <Route path="/admin-inbox" element={<AdminPortal />} />
      <Route path="/admin-audit-manager" element={<AdminPortal />} />
      <Route path="/inbox" element={<AdminPortal />} />
      <Route path="/admin-deadline-guard" element={<AdminPortal />} />
      <Route path="/admin-audit-manager" element={<AdminPortal />} />
      
      {/* Redirect old public pages to the new ComingSoon landing page */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/workflow-tools" element={<Navigate to="/" replace />} />
      <Route path="/services" element={<Navigate to="/" replace />} />
      <Route path="/workflow-tools-access" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


