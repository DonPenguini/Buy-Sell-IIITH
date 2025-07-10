import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Contact_Number: {
        type: Number,
        required: true
    },
    comments: [
        {
        type: String,
        required: false
        }
    ]
},
{
    timestamps: true
}
);

const user = mongoose.model('user', userSchema);

export default user;
