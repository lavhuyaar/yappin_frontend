import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import { BrowserRouter } from "react-router";
import { Flip, ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ChatsProvider } from "./context/ChatsContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ChatsProvider>
            <AppRoutes />
            <ToastContainer
              autoClose={1000}
              hideProgressBar
              theme="dark"
              transition={Flip}
              position="top-center"
            />
          </ChatsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
