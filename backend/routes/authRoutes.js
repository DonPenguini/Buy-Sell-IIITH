import express from 'express';
import { authenticated, login, logout, register } from '../controllers/auth.js';
import { userauth } from '../middleware/userauth.js';

export const authrouter = express.Router(); // Added a router

authrouter.post('/login', login);
authrouter.post('/register', register);
authrouter.post('/logout', logout);
authrouter.get('/isauth',userauth, authenticated); 
