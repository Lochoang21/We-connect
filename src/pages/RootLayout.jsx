// src/pages/RootLayout.jsx
import { Outlet } from "react-router-dom";
import AuthProvider from "@components/AuthProvider";

const RootLayout = () => {
  return (
    <AuthProvider>
      <div>
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default RootLayout;