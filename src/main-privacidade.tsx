import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PrivacidadePage from "./pages/Privacidade";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivacidadePage />
  </StrictMode>
);
