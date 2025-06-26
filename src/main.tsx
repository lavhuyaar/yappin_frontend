import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter } from "react-router";
import { Flip, ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          autoClose={1000}
          hideProgressBar
          theme="dark"
          transition={Flip}
          position="top-center"
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
