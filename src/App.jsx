import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import WorkflowTools from "./pages/WorkflowTools";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import ClientLogin from "./pages/ClientLogin";
import ClientPortal from "./pages/ClientPortal";
import EASCertification from "./pages/EASCertification";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workflow-tools" element={<WorkflowTools />} />
      <Route path="/services" element={<Services />} />
      <Route path="/workflow-tools-access" element={<Pricing />} />
      <Route path="/client-login" element={<ClientLogin />} />
      <Route path="/client-portal" element={<ClientPortal />} />
      <Route path="/EASLegalCertification" element={<EASCertification />} />
    </Routes>
  );
}

