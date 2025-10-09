// src/pages/HomePage.jsx
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "@components/HomePage/navbar"
import LeftSidebar from "@/components/HomePage/left-sidebar";
import MainFeed from "@/components/HomePage/main-feed";
import RightSidebar from "@/components/HomePage/right-sidebar";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Welcome to WeConnect</h1>
          <p className="mb-4">Please login to continue</p>
          <Button 
            variant="contained" 
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="flex justify-center max-w-full mx-auto">
        <LeftSidebar />
        <MainFeed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;