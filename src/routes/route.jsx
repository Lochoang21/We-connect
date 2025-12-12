import { lazy } from "react";
import AuthLayout from "@pages/auth/AuthLayout";
import RegisterPage from "@pages/auth/RegisterPage";
import LoginPage from "@pages/auth/LoginPage";
import { PublicRoute } from "@components/PublicRoute";
import { PrivateRoute } from "@components/PrivateRoute";

const HomePage = lazy(() => import("@pages/HomePage"));

const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/register",
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
    ],
  },
];

export default routes;
