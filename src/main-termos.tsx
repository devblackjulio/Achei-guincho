import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import TermosPage from "./pages/Termos";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TermosPage />
  </StrictMode>
);
