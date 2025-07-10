import express from 'express';
import { getuserdata, updateUserData, addComment } from '../controllers/usercontroller.js';
import { userauth } from '../middleware/userauth.js';

export const userrouter = express.Router(); 

userrouter.get('/data', userauth, getuserdata);
userrouter.put('/data', userauth, updateUserData);
userrouter.post('/comment', userauth, addComment);

export default userrouter;