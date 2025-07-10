import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item",
            required: true,
        },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['pending','completed']
        },
        otp:{
            type: String,
            required: true,
        },
},
    { timestamps: true }
);

const order = mongoose.model("order", orderSchema);
export default order;
