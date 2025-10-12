import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const HomePage = lazy(() => import("@pages/HomePage"));
import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicRoute } from '@/components/PublicRoute';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
      },
      // {
      //   path: "/profile/:userId",
      //   element:  <ProtectedRoute>
      //           <ProfilePage />
      //         </ProtectedRoute>
      // },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <PublicRoute>
                <RegisterPage />
              </PublicRoute>
          },
          {
            path: "/login",
            element:
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            
          }
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
  </Provider>,
);