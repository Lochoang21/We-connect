import Navbar from "@components/HomePage/navbar";
import LeftSidebar from "@/components/HomePage/left-sidebar";
import MainFeed from "@/components/HomePage/main-feed";
import RightSidebar from "@/components/HomePage/right-sidebar";

const HomePage = () => {
  // Mock user data cho giao diện
  const mockUser = {
    user_metadata: {
      full_name: "John Doe",
      avatar_url: null
    },
    email: "john.doe@example.com"
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar user={mockUser} />
      <div className="flex justify-center max-w-full mx-auto">
        <LeftSidebar />
        <MainFeed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;  