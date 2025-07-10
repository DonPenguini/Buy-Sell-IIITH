import express from 'express';
import { getCartItems,addToCart, removeFromCart, placeOrder } from '../controllers/cart.js';
import { userauth } from '../middleware/userauth.js';

const cartRouter = express.Router();

cartRouter.get('/', userauth, getCartItems);
cartRouter.post('/', userauth, addToCart);
cartRouter.delete('/:id', userauth, removeFromCart);
cartRouter.post('/place', userauth, placeOrder); 

export default cartRouter;