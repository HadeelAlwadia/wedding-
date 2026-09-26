import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext";
import { ProviderContextProvider } from "./context/ProviderContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProviderContextProvider>
        <App />
      </ProviderContextProvider>
    </AuthProvider>
  </StrictMode>
);