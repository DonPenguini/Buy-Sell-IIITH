import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/appContext';
import { useContext } from 'react';

const CustomToolbar: React.FC = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${appContext?.backendurl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Logged out successfully!");
        localStorage.removeItem('authToken');
        if (appContext) {
          appContext.setIsLoggedin(false);
        }
        // Redirect to login page
        navigate('/signin');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong during logout!"
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%', color: 'black'
     }}>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="primary"
        sx={{ marginRight: 2, fontWeight: 'bold' }}
        className='text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight'
      >
        Log Out
      </Button>
    </Box>
  );
};

export default CustomToolbar;