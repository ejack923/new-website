import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";
import WorkflowTools from "./pages/WorkflowTools";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ComingSoon />} />
      <Route path="/home" element={<Home />} />
      <Route path="/workflow-tools" element={<WorkflowTools />} />
      <Route path="/services" element={<Services />} />
      <Route path="/workflow-tools-access" element={<Pricing />} />
    </Routes>
  );
}
