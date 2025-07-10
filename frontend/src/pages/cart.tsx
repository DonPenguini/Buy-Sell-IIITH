import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

interface CartItem {
  id: string;
  name: string;
  price: number;
  seller: {
    id: string;
    First_Name: string;
    Last_Name: string;
  };
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState(0);

  const fetchCartItems = async () => { // fetch and then calculate
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      if (response.data.success) {
        setCartItems(response.data.cartItems);
        setTotalCost(response.data.cartItems.reduce((total: number, item: CartItem) => total + item.price, 0));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error('Error fetching cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      if (response.data.success) {
        setCartItems(cartItems.filter(item => item.id !== itemId));
        setTotalCost(cartItems.reduce((total, item) => total + item.price, 0));
        toast.success('Item removed from cart');
        window.location.reload();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Error removing item from cart');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart/place');
      if (response.data.success) {
        setCartItems([]);
        setTotalCost(0);
        toast.success('Order placed, OTP:',response.data.otp);
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      <Typography variant="h4" gutterBottom>My Cart</Typography>
      {cartItems.map(item => (
        <Box key={item.id} sx={{ margin: 2, padding: 2, border: '1px solid #ccc' }}>
          <Typography variant="h6">Name: {item.name}</Typography>
          <Typography variant="body1">Price: ₹{item.price}</Typography>
          <Typography variant="body1">Seller: {item.seller.First_Name} {item.seller.Last_Name}</Typography>
          <Button variant="contained" color="secondary" onClick={() => handleRemoveItem(item.id)}>
            Remove
          </Button>
        </Box>
      ))}
      <Typography variant="h6" gutterBottom>Total Cost: ₹{totalCost}</Typography>
      <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
        Final Order
      </Button>
    </Box>
  );
};

export default Cart;