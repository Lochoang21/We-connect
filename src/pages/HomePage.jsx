import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/slices/authSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "@components/HomePage/navbar";
import LeftSidebar from "@/components/HomePage/left-sidebar";
import MainFeed from "@/components/HomePage/main-feed";
import RightSidebar from "@/components/HomePage/right-sidebar";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // ✅ Không cần check auth nữa, ProtectedRoute đã handle
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex justify-center max-w-full mx-auto">
        <LeftSidebar />
        <MainFeed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;