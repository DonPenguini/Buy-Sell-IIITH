//Mongoose Key 7v8pmsOzVicfvV7G

import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { authrouter } from './routes/authRoutes.js';
import userrouter from './routes/userRoutes.js';
import itemrouter from './routes/itemRoutes.js';
import cartrouter from './routes/cartRoutes.js';
import orderrouter from './routes/orderRoutes.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors({origin:"http://localhost:5173",credentials: true}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/auth', authrouter);
app.use('/api/user', userrouter);
app.use('/api/items', itemrouter);
app.use('/api/cart', cartrouter);
app.use('/api/order',orderrouter)

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});

