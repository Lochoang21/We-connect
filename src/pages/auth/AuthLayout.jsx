import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Suspense } from "react";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#246AA3] to-[#1a4d7a] items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="z-10 text-center text-white px-12">
          <h1 className="text-5xl font-bold mb-6">Hello, Welcome to WeConnect</h1>
          <button
            onClick={() => navigate(isLoginPage ? '/register' : '/login')}
            className="px-12 py-3 border-2 border-white rounded-full text-white text-lg font-semibold hover:bg-white hover:text-[#246AA3] transition-all duration-300"
          >
            {isLoginPage ? 'Registration' : 'Login'}
          </button>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <Suspense fallback={<p>Loading</p>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
