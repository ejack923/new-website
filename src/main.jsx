import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/globals.css";
import { installReceiptFolderBridge } from "./lib/receiptFolderBridge";

// The portal tools shown in frames on these pages can ask this page to read Emma's ATLAS
// claim receipts folder (src/lib/receiptFolderBridge.js).
installReceiptFolderBridge();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
