import cart from '../models/cart.model.js';
import order from '../models/order.model.js';
import item from '../models/items.model.js';
import user from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("GET CART ITEMS");
        console.log(userId);
        const cartItems = await cart.find({ buyer: userId }).populate('item').populate('seller', 'First_Name Last_Name');
        const formattedCartItems = cartItems.map(cartItem => ({
            id: cartItem.item._id,
            name: cartItem.item.name,
            price: cartItem.item.price,
            seller: {
                id: cartItem.seller._id,
                First_Name: cartItem.seller.First_Name,
                Last_Name: cartItem.seller.Last_Name,
            },
        }));
        return res.status(200).json({ success: true, cartItems: formattedCartItems });
    } catch (error) {
        //cart items-> naming 
      console.log("-------------------------------------------------------------------")
        console.log(req);
        console.error('Error fetching cart items:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addToCart = async (req, res) => {
    try {
      console.log("ADD TO CART");
        const userId = req.userId;
        const { itemId } = req.body;
        console.log(itemId);
        const newitem = await item.findById(itemId);
        if (!newitem) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        if (newitem.sellerid.toString() === userId) {
            console.log("You cannot buy your own item");
            return res.status(200).json({ success: false, message: 'You cannot buy your own item' });
        }
        const cartItem = new cart({
            item: itemId,
            buyer: userId,
            seller: newitem.sellerid,
        });
        await cartItem.save();
        return res.status(200).json({ success: true, message: 'Item added to cart' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const cartItem = await cart.findOneAndDelete({ item: id, buyer: userId });
        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        return res.status(200).json({ success: true, message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await cart.find({ buyer: userId }).populate('item').populate('seller');
        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in cart' });
        }
        const orders = [];
        for (const cartItem of cartItems) {
            const otp = crypto.randomBytes(3).toString('hex'); 
            const hashedOtp = await bcrypt.hash(otp, 10); // try to add salt later
            const neworder = new order({
                item: cartItem.item._id,
                buyer: userId,
                seller: cartItem.seller._id,
                status: 'pending',
                otp: hashedOtp,
            });
            await neworder.save();
            orders.push( {order: neworder, otp});
            console.log(`OTP for order ${neworder._id}: ${otp}`);
        }
        await cart.deleteMany({ buyer: userId }); 
        return res.status(200).json({ success: true, message: 'Order placed successfully', orders });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};