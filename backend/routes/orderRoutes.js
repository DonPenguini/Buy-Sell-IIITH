import express from 'express';
import { getOrdersHistory, getDeliverOrders, completeOrder, getSellerid } from '../controllers/ordercontroller.js';
import { userauth } from '../middleware/userauth.js';
import { regenerateOtp } from '../controllers/ordercontroller.js';

const orderrouter = express.Router();

orderrouter.get('/history', userauth, getOrdersHistory);
orderrouter.get('/deliver', userauth, getDeliverOrders);
orderrouter.post('/complete/:id', userauth, completeOrder);
orderrouter.post('/regenerateotp/:id', userauth, regenerateOtp);
orderrouter.get('/seller/:id', userauth, getSellerid);

export default orderrouter;