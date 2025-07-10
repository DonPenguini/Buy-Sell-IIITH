import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, Typography, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { toast } from 'react-toastify';

interface Order {
  id: string;
  item: string;
  status: string;
  otp: string;
}

interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  sellerid: string,
}

const OrdersHistory: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [boughtItems, setBoughtItems] = useState<Item[]>([]);
  const [soldItems, setSoldItems] = useState<Item[]>([]);
  const [comment, setComment] = useState('');
  const [selectedSellerId, setSelectedSellerId] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order/history');
        if (response.data.success) {
          setPendingOrders(response.data.pendingOrders);
          setBoughtItems(response.data.boughtItems);
          setSoldItems(response.data.soldItems);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching orders history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersHistory();
  }, []);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleRegenerateOtp = async (orderId: string) => {
    try {
      console.log('Regenerating OTP for order:', orderId);
      const response = await axios.post(`http://localhost:5000/api/order/regenerateotp/${orderId}`);
      if (response.data.success) {
        console.log('New OTP:', response.data.otp);
        toast.success(`New OTP: ${response.data.otp}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error regenerating OTP:', error);
      toast.error('Error regenerating OTP');
    }
  };

  const handleOpenDialog = (sellerid: string) => {
    setSelectedSellerId(sellerid);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedSellerId('');
    setComment('');
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/comment', { sellerid: selectedSellerId, comment });
      if (response.data.success) {
        console.log('Comment added successfully');
        toast.success('Comment added successfully');
        handleCloseDialog();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Error adding comment');
    } 
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', padding: 4 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Pending Orders" />
        <Tab label="Bought Items" />
        <Tab label="Sold Items" />
      </Tabs>
      {tabIndex === 0 && (
        <Box>
          {pendingOrders.map((order) => (
            <Box key={order.id} sx={{ margin: 2, padding: 2, border: '1px solid #ccc' }}>
              <Typography variant="h6">Item: {order.item}</Typography>
              <Typography variant="body1">Status: {order.status}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleRegenerateOtp(order.id)}>
                Regenerate OTP
              </Button>
            </Box>
          ))}
        </Box>
      )}
      {tabIndex === 1 && (
        <Box>
          {boughtItems.map((item) => (
            <Box key={item.id} sx={{ margin: 2, padding: 2, border: '1px solid #ccc' }}>
              <Typography variant="h6">Name: {item.name}</Typography>
              <Typography variant="body1">Price: ₹{item.price}</Typography>
              <Typography variant="body1">Category: {item.category}</Typography>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog(item.sellerid)}>
                  Add Comment
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      )}
      {tabIndex === 2 && (
        <Box>
          {soldItems.map((item) => (
            <Box key={item.id} sx={{ margin: 2, padding: 2, border: '1px solid #ccc' }}>
              <Typography variant="h6">Name: {item.name}</Typography>
              <Typography variant="body1">Price: ₹{item.price}</Typography>
              <Typography variant="body1">Category: {item.category}</Typography>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
            </Box>
          ))}
        </Box>
      )}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddComment} color="primary">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdersHistory;