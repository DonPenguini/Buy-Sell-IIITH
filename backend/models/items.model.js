import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        sellerid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    }
);

const item = mongoose.model("item", itemSchema);
export default item;