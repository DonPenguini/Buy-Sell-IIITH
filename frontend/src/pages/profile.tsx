import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, CircularProgress, List, ListItem, ListItemText, Paper, Avatar } from '@mui/material';
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Age: '',
    Contact_Number: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await axios.get('http://localhost:5000/api/user/data', {
            withCredentials: true,
          });
          if (response.data.success) {
            setUserData(response.data.userdata);
            setFormData({
              First_Name: response.data.userdata.First_Name,
              Last_Name: response.data.userdata.Last_Name,
              Age: response.data.userdata.Age,
              Contact_Number: response.data.userdata.Contact_Number,
            });
          } else {
            console.error(response.data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.put('http://localhost:5000/api/user/data', formData, {
          withCredentials: true,
        });
        if (response.data.success) {
          setUserData(response.data.userdata);
          setEditing(false);
          console.log('User data updated successfully');
          toast.success('User data updated successfully');
        } else {
          console.error(response.data.message);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Error updating user data');
    }
  };

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.put('http://localhost:5000/api/user/data', passwordData, {
          withCredentials: true,
        });
        if (response.data.success) {
          setChangingPassword(false);
          console.log('Password updated successfully');
          toast.success('Password updated successfully');
        } else {
          console.error(response.data.message);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Error updating password');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6">No user data found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Paper elevation={3} sx={{ padding: 3, width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center' , borderRadius: 15}}>
          <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} />
          <Typography variant="h5" gutterBottom>
            {userData.First_Name} {userData.Last_Name}
          </Typography>
          {!changingPassword && (
            <>
              {editing ? (
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="First_Name"
                    value={formData.First_Name}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="Last_Name"
                    value={formData.Last_Name}
                    onChange={handleChange}
                    margin="normal"
                    required
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
                  />
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="Contact_Number"
                    value={formData.Contact_Number}
                    onChange={handleChange}
                    margin="normal"
                    required
                  />
                  <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                </Box>
              ) : (
                <Box sx={{ width: '100%' }}>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: 1 }}>
                    <strong>First Name:</strong> {userData.First_Name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: 1 }}>
                    <strong>Last Name:</strong> {userData.Last_Name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: 1 }}>
                    <strong>Email:</strong> {userData.Email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: 1 }}>
                    <strong>Age:</strong> {userData.Age}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', marginBottom: 1 }}>
                    <strong>Contact Number:</strong> {userData.Contact_Number}
                  </Typography>
                  <Button variant="contained"   color="primary" sx={{ mt: 2, borderRadius:10 }} onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                  <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2, borderRadius:10 }} onClick={() => setChangingPassword(true)}>
                    Change Password
                  </Button>
                </Box>
              )}
            </>
          )}
          {changingPassword && (
            <Box component="form" onSubmit={handlePasswordSubmit} sx={{ mt: 4, width: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Change Password
              </Typography>
              <TextField
                fullWidth
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Save Password
              </Button>
              <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={() => setChangingPassword(false)}>
                Cancel
              </Button>
            </Box>
          )}
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, width: '80%' }}>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <List>
            {userData.comments.map((comment: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default ProfilePage;