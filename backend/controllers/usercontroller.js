import user from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getuserdata = async (req,res) => {
    try{
        console.log("hi");
        console.log(req.userId);
        const userId = req.userId;
        console.log(userId);
        const getuser = await user.findById(userId);
        if(!getuser){
            return res.status(400).json({success: false, message: "User not found"});
        }
        console.log("getuser");
        console.log(getuser);
        return res.json({
            success: true,
            userdata:{
                First_Name: getuser.First_Name,
                Last_Name: getuser.Last_Name,
                Email: getuser.Email,
                Contact_Number: getuser.Contact_Number,
                Age: getuser.Age,
                comments: getuser.comments
            }
        });
    }
    catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
}

export const updateUserData = async(req, res) => {
    try {
        const userId = req.userId;
        const { First_Name, Last_Name, Age, Contact_Number, currentPassword, newPassword } = req.body;
        const updatedFields = { First_Name, Last_Name, Age, Contact_Number };
        if (currentPassword && newPassword) {
            const existingUser = await user.findById(userId);
            const isMatch = await bcrypt.compare(currentPassword, existingUser.Password);
            if (!isMatch) {
                return res.status(400).json({ success: false, message: 'Current password is incorrect' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updatedFields.Password = hashedPassword;
        }
        const updatedUser = await user.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true, runValidators: true }
        ).select('-Password');
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({ success: true, userData: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addComment = async (req, res) => {
    try{
        const userId = req.userId;
        const { comment } = req.body;
        const fetcheduser = await user.findById(userId);
        if(!fetcheduser){
            return res.status(404).json({success: false, message: "User not found"});
        }
        fetcheduser.comments.push(comment);
        await fetcheduser.save();
        return res.status(200).json({success: true, message: "Comment added successfully", comments: fetcheduser.comments});
    }
    catch(error){
        return res.status(500).json({ success: false, message: error.message });
    }
}