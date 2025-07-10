import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/useAuth';

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/items', {
        name,
        price,
        description,
        image,
        category,
      });
      if (response.data.success) {
        toast.success('Item added successfully');
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Error adding item');
    }
  };

  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height: '100vh',
    //     textAlign: 'center',
    //     padding: 4,
    //     position: 'relative',
    //   }}
    // >
    //   <img
    //     src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZseTMxM2liZHAzemJucTYwN3RsdWVpN25xaG5nb3p3bDN6cnZoeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zJ5udfK9zBcyJDD7xz/giphy.gif"
    //     alt="Welcome to BuySell@IIITH"
    //     style={{ width: '60%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px', marginBottom: '20px' }}
    //   />
    //   <Typography variant="h4" gutterBottom className='text-gray-900 dark:text-white mt-20 text-base font-medium tracking-tight'>
    //     Welcome to BuySell@IIITH
    //   </Typography>
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     onClick={handleClickOpen}
    //     sx={{
    //       position: 'absolute',
    //       bottom: 16,
    //       right: 16,
    //     }}
    //   >
    //     Add Item
    //   </Button>
    //   <Dialog open={open} onClose={handleClose}>
    //     <DialogTitle>Add New Item</DialogTitle>
    //     <DialogContent>
    //       <TextField
    //         label="Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         fullWidth
    //         margin="normal"
    //         required
    //       />
    //       <TextField
    //         label="Price"
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //         fullWidth
    //         margin="normal"
    //         required
    //       />
    //       <TextField
    //         label="Description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         fullWidth
    //         margin="normal"
    //         required
    //       />
    //       <TextField
    //         label="Image URL"
    //         value={image}
    //         onChange={(e) => setImage(e.target.value)}
    //         fullWidth
    //         margin="normal"
    //         required
    //       />
    //       <TextField
    //         label="Category"
    //         value={category}
    //         onChange={(e) => setCategory(e.target.value)}
    //         fullWidth
    //         margin="normal"
    //         required
    //       />
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose} color="secondary">
    //         Cancel
    //       </Button>
    //       <Button onClick={handleAddItem} color="primary">
    //         Add Item
    //       </Button>
    //     </DialogActions>
    //   </Dialog>
    // </Box>
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: 4,
      position: 'relative',
    }}
  >
    <img
      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWZseTMxM2liZHAzemJucTYwN3RsdWVpN25xaG5nb3p3bDN6cnZoeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zJ5udfK9zBcyJDD7xz/giphy.gif"
      alt="Welcome to BuySell@IIITH"
      style={{ width: '60%', maxHeight: '600px', objectFit: 'contain', borderRadius: '8px', marginRight: '20px' }}
    />
    <Box sx={{ textAlign: 'left' }}>
    <Typography
          variant="h4"
          gutterBottom
          className='text-gray-900 dark:text-white mt-20 text-base font-medium tracking-tight'
          sx={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            marginBottom: '20px',
          }}
        >
          Welcome to BuySell@IIITH
        </Typography>
        <Typography
          variant="body1"
          className='text-gray-900 dark:text-white mt-20 text-base font-medium tracking-tight'
          sx={{
            fontSize: '1.2rem',
            lineHeight: '1.5',
          }}
        >
          Your one-stop platform for buying and selling items within the IIIT-H community.
        </Typography>
    </Box>
    <Button
      variant="contained"
      color="primary"
      onClick={handleClickOpen}
      sx={{
        position: 'absolute',
        bottom: 16,
        right: 16,
      }}
    >
      Add Item
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='text-gray-900 dark:text-white mt-20 text-base font-medium tracking-tight' sx={{ fontWeight: 'bold' }}>Add New Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddItem} color="primary">
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  );
}