import { useContext } from 'react';
import { AppContext } from '../context/appContext';

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  // console.log(context);
  console.log('context', context);
  const { isLoggedin, setIsLoggedin, loading} = context;
  return { isAuthenticated: isLoggedin, setIsAuthenticated: setIsLoggedin, loading};
};
