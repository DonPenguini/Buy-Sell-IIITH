import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

interface Order {
  id: string;
  item: {
    name: string;
    price: number;
  };
  buyer: {
    First_Name: string;
    Last_Name: string;
  };
}

const DeliverItems: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [otps, setOtps] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/deliver');
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOtpChange = (orderId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtps({ ...otps, [orderId]: event.target.value });
  };

  const handleCompleteOrder = async (orderId: string) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/order/complete/${orderId}`, { otp: otps[orderId] });
      if (response.data.success) {
        toast.success('Transaction completed successfully');
        setOrders(orders.filter(order => order.id !== orderId));
        setOtps({ ...otps, [orderId]: '' });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error completing transaction:', error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error completing transaction');
      }
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
      <Typography variant="h4" gutterBottom>Deliver Items</Typography>
      {orders.map(order => (
        <Box key={order.id} sx={{ margin: 2, padding: 2, border: '1px solid #ccc' }}>
          <Typography variant="h6">Item: {order.item.name}</Typography>
          <Typography variant="body1">Price: ₹{order.item.price}</Typography>
          <Typography variant="body1">Buyer: {order.buyer.First_Name} {order.buyer.Last_Name}</Typography>
          <TextField
            label="Enter OTP"
            value={otps[order.id] || ''}
            onChange={handleOtpChange(order.id)}
            margin="normal"
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={() => handleCompleteOrder(order.id)}>
            Complete Transaction
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default DeliverItems;