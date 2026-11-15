import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ExclusaoDeContaPage from "./pages/ExclusaoDeConta";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ExclusaoDeContaPage />
  </StrictMode>
);
