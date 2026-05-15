import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import WorkflowTools from "./pages/WorkflowTools";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import ClientLogin from "./pages/ClientLogin";
import EASPortal from "./pages/EASPortal";
import VALSPortal from "./pages/VALSPortal";
import EASCertification from "./pages/EASCertification";
import VALSCertification from "./pages/VALSCertification";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workflow-tools" element={<WorkflowTools />} />
      <Route path="/services" element={<Services />} />
      <Route path="/workflow-tools-access" element={<Pricing />} />
      <Route path="/client-login" element={<ClientLogin />} />
      <Route path="/eas-portal" element={<EASPortal />} />
      <Route path="/vals-portal" element={<VALSPortal />} />
      <Route path="/EASLegalCertification" element={<EASCertification />} />
      <Route path="/VALSCertification" element={<VALSCertification />} />
    </Routes>
  );
}

