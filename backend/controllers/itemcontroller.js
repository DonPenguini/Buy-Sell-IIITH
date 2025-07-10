import item from "../models/items.model.js";

export const getItems = async (req, res) => {
    try {
        const items = await item.find().populate('sellerid', 'First_Name Last_Name');
        console.log("items");
        console.log(items);
        return res.status(200).json({ success: true, items });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(itemId);
        const fetcheditem= await item.findById(itemId).populate('sellerid', 'First_Name Last_Name');
        console.log("getItemById");
        // console.log(item);
        // console.log(itemId);
        if(!fetcheditem){
            console.log("Item not found");
            return res.status(400).json({success: false, message: "Item not found"});
        }
        return res.status(200).json({ success: true, fetcheditem});
    }
    catch (error) {
        console.log("error");
        console.log("--------------------------------------------------------------------------------");
        console.log(req);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const addItem = async (req, res) => {
    try {
        const { name, price, description, image, category, } = req.body;
        const sellerid = req.userId;
        const newItem = new item({ name, price, description, image, category, sellerid });
        console.log(newItem);
        await newItem.save();
        return res.status(201).json({ success: true, item: newItem });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateItem = async (req, res) => {
try{
    const { name, price, description, image, category, sellerid } = req.body;
    const itemId = req.params.id;
    const updatedItem= await item.findByIdAndUpdate(
        itemId,
        { name, price, description, image, category, sellerid },
        { new: true, runValidators: true }
    );
    if(!updatedItem){
        return res.status(404).json({success: false, message: "Item not found"});
    }
    return res.status(200).json({success: true, item: updatedItem});
}
catch(error){
    return res.status(500).json({success: false, message: error.message});
}
};

export const deleteItem = async (req, res) => {
    try{
        const itemId = req.params.id;
        const deleteItem = await item.findByIdAndDelete(itemId);
        if(!deleteItem){
            return res.status(404).json({success: false, message: "Item not found"});
        }
        return res.status(200).json({success: true, message: "Item deleted successfully"});
    }
    catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};