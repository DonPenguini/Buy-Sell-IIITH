import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({ //mongoose object
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'item', required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
},
  { timestamps: true }
);

const cart = mongoose.model('cart', cartSchema);

export default cart;