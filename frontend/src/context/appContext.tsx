import React from 'react';
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface AppContextProps {
  backendurl: string;
  isLoggedin: boolean;
  setIsLoggedin: (status: boolean) => void;
  loading: boolean;
}

export const AppContext = createContext<AppContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {

  axios.defaults.withCredentials = true;
  const backendurl = 'http://localhost:5000';
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAuthState = async () => {
    try {
      const token = localStorage.getItem('authToken'); // fetch the stores token
      console.log('ttttt');
      // console.log('token', token);
      if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data } = await axios.get(`${backendurl}/api/auth/isauth`, {
          withCredentials: true,
        });
        console.log('inside getAuthState', data);
      if (data.success) {
        console.log('setting isloggedin to true');
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    }else{
      console.log('setting isloggedin to false');
      setIsLoggedin(false);
    }
    } catch {
      setIsLoggedin(false);
      toast.error('Unable to fetch user data');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      getAuthState();
  }, []);


  const value: AppContextProps = {
    backendurl,
    isLoggedin,
    setIsLoggedin,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
