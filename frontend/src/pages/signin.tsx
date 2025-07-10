import * as React from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AppContext } from '../context/appContext';
import ReCAPTCHA  from 'react-google-recaptcha';

const SITE_KEY= '6LcMVc0qAAAAAEaQc5nsyiue3HgjRnqIAx6YUswX';

type SignInFormData = {
  Email: string;
  Password: string;
};


export interface SignInPageProps {
  onSignIn?: (formData: SignInFormData) => void | Promise<void>;
  signUpLink?: React.ReactNode;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignIn, signUpLink }) => {
  const navigate = useNavigate();
  const { setIsLoggedin} = useContext(AppContext) ?? {};
  if(!setIsLoggedin){
    throw new Error('AppContext is not provided')
  }
  const [formData, setFormData] = React.useState<SignInFormData>({
    Email: '',
    Password: '',
  });

  //Cap
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
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!capval){
      //console.log('capval', capval);
      toast.error('Please complete the captcha');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData,{
        withCredentials: true,
      });
      const data = response.data;
      // console.log('signin');
      // console.log('data', data);
      // console.log('response', response);
      // console.log('token', data.token);
      if (data.success === true) {
        setIsLoggedin && setIsLoggedin(true);
        // console.log('setIsLoggedin', setIsLoggedin);
        localStorage.setItem('authToken', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`; // auth token to next requests
        toast.success('Logged in successfully! Redirecting to Dashboard...');
        setTimeout(() => navigate('/dash'), 2000);
      } else {
        toast.error(data.message || 'Login failed. Please try again');
      }

      if (onSignIn) {
        await onSignIn(formData);
      }
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : 'Login failed. Please try again';
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
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
            Sign In
          </Button>
        </Box>
        <Box sx={{ marginTop: 3 }}>
          {signUpLink || (
            <Typography variant="body2" sx={{ color: '#9AA0A6' }}>
              Don't have an account?{' '}
              <Link href="/signup" sx={{ color: '#8AB4F8', fontWeight: 'bold' }}>
                Create account
              </Link>
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;

