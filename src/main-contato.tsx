import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ContatoPage from "./pages/Contato";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContatoPage />
  </StrictMode>
);
