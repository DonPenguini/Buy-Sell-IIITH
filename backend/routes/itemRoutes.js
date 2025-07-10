import express from 'express';
import { getItems, getItemById, addItem, updateItem, deleteItem } from '../controllers/itemcontroller.js';
import { userauth } from '../middleware/userauth.js';

const itemrouter = express.Router();

itemrouter.get('/', getItems);
itemrouter.get('/:id', getItemById);
itemrouter.post('/', userauth, addItem);
itemrouter.put('/:id', userauth, updateItem);
itemrouter.delete('/:id', userauth, deleteItem);

export default itemrouter;