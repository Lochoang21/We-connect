import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { CircularProgress, Box } from '@mui/material';

export const PublicRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show loading while checking auth
  if (!isInitialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
