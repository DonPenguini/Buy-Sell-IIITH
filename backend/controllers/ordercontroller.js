import bcrypt from 'bcryptjs';
import order from '../models/order.model.js';
import crypto from 'crypto';

export const getOrdersHistory = async (req, res) => {
    try {
        const userId = req.userId; 
        console.log("getOrdersHistory");
        console.log(userId);
        const pendingOrders = await order.find({ buyer: userId, status: 'pending' }).populate('item').populate('seller', 'First_Name Last_Name');
        const boughtItems = await order.find({ buyer: userId, status: 'completed' }).populate('item').populate('seller', 'First_Name Last_Name');
        const soldItems = await order.find({ seller: userId, status: 'completed' }).populate('item').populate('buyer', 'First_Name Last_Name');

        const pendingOrdersWithOtp = pendingOrders.map(order => ({
            id: order._id,
            item: order.item.name,
            status: order.status,
            otp: order.otp, 
        }));

        const boughtItemsFormatted = boughtItems.map(order => ({
            id: order.item._id,
            name: order.item.name,
            price: order.item.price,
            category: order.item.category,
            image: order.item.image,
        }));

        const soldItemsFormatted = soldItems.map(order => ({
            id: order.item._id,
            name: order.item.name,
            price: order.item.price,
            category: order.item.category,
            image: order.item.image,
        }));

        return res.status(200).json({
            success: true,
            pendingOrders: pendingOrdersWithOtp,
            boughtItems: boughtItemsFormatted,
            soldItems: soldItemsFormatted,
        });
    } catch (error) {
        console.error('Error fetching orders history:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getDeliverOrders = async (req, res) => {
    try {
        const userId = req.userId; 
        const orders = await order.find({ seller: userId, status: 'pending' }).populate('item').populate('buyer', 'First_Name Last_Name');
        const formattedOrders = orders.map(order => ({
            id: order._id,
            item: {
                name: order.item.name,
                price: order.item.price,
            },
            buyer: {
                First_Name: order.buyer.First_Name,
                Last_Name: order.buyer.Last_Name,
            },
            otp: order.otp, 
        }));
        return res.status(200).json({ success: true, orders: formattedOrders });
    } catch (error) {
        console.error('Error fetching deliver orders:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const completeOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { otp } = req.body;
        const completedorder = await order.findById(id).populate('buyer', 'First_Name Last_Name');
        if (!completedorder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        const isMatch = await bcrypt.compare(otp, completedorder.otp);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }
        completedorder.status = 'completed';
        await completedorder.save();
        return res.status(200).json({ success: true, message: 'Order completed successfully' });
    } catch (error) {
        console.error('Error completing order:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const regenerateOtp = async (req, res) => {
    try {
      const orderId = req.params.id;
      console.log("--------------------orderID")
      console.log(orderId);
      const neworder = await order.findById(orderId);
      if (!neworder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
      const otp = crypto.randomBytes(3).toString('hex'); 
      const hashedOtp = await bcrypt.hash(otp, 10); 
      neworder.otp = hashedOtp;
      await neworder.save();
      return res.status(200).json({ success: true, message: 'OTP regenerated successfully', otp });
    } catch (error) {
      console.error('Error regenerating OTP:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  export const getSellerid = async (req, res) => {
    try {
        const orderId = req.params.id;
        console.log(orderId);
        console.log("getSellerid");
        const orderDetails = await order.findById(orderId);
        console.log(orderDetails);
        console.log(orderDetails.seller._id);
        if (!orderDetails) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        return res.status(200).json({ success: true, seller: orderDetails.seller._id });
    } catch (error) {
        console.error('Error fetching seller details:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}