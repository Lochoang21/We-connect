import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./configs/muiConfig";
import AuthLayout from "@pages/auth/AuthLayout";
import RegisterPage from "@pages/auth/RegisterPage";
import LoginPage from "@pages/auth/LoginPage";
import { Provider } from "react-redux";
import store from "@redux/store";

const HomePage = lazy(() => import("@pages/HomePage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  </Provider>
);