import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Card, CardContent, CardMedia } from '@mui/material';
import { useAuth } from '../context/useAuth';
import { toast } from 'react-toastify';

interface Item {
  id: string;
  name: string;
  price: number;
  sellerid: { First_Name: string; Last_Name: string; };
  category: string;
  image: string;
  description: string;
}

const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        console.log('Fetching item:', id);
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        console.log('fetchItem response:', response.data);
        if (response.data.success) {
          setItem(response.data.fetcheditem);
        } else {
          console.log("errrrr")
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('You need to be logged in to add items to the cart');
      navigate('/signin');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log('Adding item to cart:', id);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.post('http://localhost:5000/api/cart', { itemId: id }, { withCredentials: true });
        console.log('handleAddToCart response:');
        if (response.data.success) {
          toast.success('Item added to cart successfully');
        } else {
          console.error(response.data.message);
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Error adding item to cart');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!item) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography variant="h6">Item not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={item.image}
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {item.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Price: ${item.price}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Seller: {item.sellerid.First_Name} {item.sellerid.Last_Name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Category: {item.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Description: {item.description}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ItemDetail;