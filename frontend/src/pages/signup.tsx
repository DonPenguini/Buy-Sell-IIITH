//NEED TO FIX RECAPTCHA

import * as React from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import ReCAPTCHA  from 'react-google-recaptcha';

//6LcMVc0qAAAAAEaQc5nsyiue3HgjRnqIAx6YUswX- sitekey

type SignUpFormData = {
  First_Name: string;
  Last_Name: string;
  Age: number;
  Email: string;
  Contact_Number: string;
  Password: string;
};

export interface SignUpPageProps {
  onSignUp?: (formData: SignUpFormData) => void | Promise<void>;
  signInLink?: React.ReactNode;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, signInLink }) => {
  const navigate = useNavigate();
  const { setIsLoggedin} = useContext(AppContext) ?? {};
  const [formData, setFormData] = React.useState<SignUpFormData>({
    First_Name: '',
    Last_Name: '',
    Age: 0,
    Email: '',
    Contact_Number: '',
    Password: '',
  });

  const [capval, setCapval] = React.useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCapChange = (value: string | null) => {
    setCapval(value);
  }
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!capval){
      //console.log('Please complete the ReCAPTCHA');
      toast.error('Please complete the ReCAPTCHA');
      return
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData,{
        withCredentials: true,
      });
      const data = response.data;
      //console.log(data);
      if (data.success === true) {
        setIsLoggedin && setIsLoggedin(true);
        localStorage.setItem('authToken', data.token);
        toast.success('Account created successfully! Redirecting to Dashboard...');
        setTimeout(() => navigate('/dash'), 2000);
      } else {
        toast.error(data.message || 'Sign-up failed. Please try again');
      }

      if (onSignUp) {
        await onSignUp(formData);
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Sign-up failed. Please try again';
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212', 
        padding: 2,
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          backgroundColor: '#1E1E1E', 
          borderRadius: 4,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)', 
          padding: 5,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: '#E8EAED', fontWeight: '500' }}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First_Name"
            name="First_Name"
            value={formData.First_Name}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#9AA0A6' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#5F6368' },
                '&:hover fieldset': { borderColor: '#E8EAED' },
                '& input': { color: '#E8EAED' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Last_Name"
            name="Last_Name"
            value={formData.Last_Name}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#9AA0A6' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#5F6368' },
                '&:hover fieldset': { borderColor: '#E8EAED' },
                '& input': { color: '#E8EAED' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Age"
            name="Age"
            type="number"
            value={formData.Age}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#9AA0A6' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#5F6368' },
                '&:hover fieldset': { borderColor: '#E8EAED' },
                '& input': { color: '#E8EAED' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="Contact_Number"
            value={formData.Contact_Number}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#9AA0A6' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#5F6368' },
                '&:hover fieldset': { borderColor: '#E8EAED' },
                '& input': { color: '#E8EAED' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="Email"
            type="email"
            value={formData.Email}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#9AA0A6' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#5F6368' },
                '&:hover fieldset': { borderColor: '#E8EAED' },
                '& input': { color: '#E8EAED' },
              },
            }}
          />
                    <TextField
            fullWidth
            label="Password"
            name="Password"
            type="password"
            value={formData.Password}
            onChange={handleChange}
            margin="normal"
            required
            sx={{
              '& .MuiInputLabel-root': { color: '#9AA0A6' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#5F6368' },
                '&:hover fieldset': { borderColor: '#E8EAED' },
                '& input': { color: '#E8EAED' },
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <ReCAPTCHA
              sitekey="6LcMVc0qAAAAAEaQc5nsyiue3HgjRnqIAx6YUswX"
              onChange={handleCapChange}
            />
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              marginTop: 3,
              padding: '10px 0',
              backgroundColor: '#1A73E8',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#174EA6' },
            }}
          >
            Sign Up
          </Button>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          {signInLink || (
            <Typography variant="body2" sx={{ color: '#9AA0A6' }}>
              Already have an account?{' '}
              <Link href="/signin" sx={{ color: '#8AB4F8', fontWeight: 'bold' }}>
                Sign in
              </Link>
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
