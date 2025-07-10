import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.model.js';

// const RECAPTCHA_SECRET_KEY='6LcMVc0qAAAAANhVn9KHJDmh4FawEzziBE6Ev6ey';

export const register = async(req, res) => {
    const { First_Name, Last_Name, Email, Password, Age, Contact_Number} = req.body;
    console.log(req.body);
    if(!First_Name || !Last_Name || !Email || !Password || !Age || !Contact_Number) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    try{
        //Captcha Backend -> token is sending but google no response
        // const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        //     params: {
        //       secret: RECAPTCHA_SECRET_KEY,
        //       response: token,
        //     },
        // });
        // if(!recaptchaResponse.data.success){
        //     return res.status(400).json({success: false, message: "Failed captcha verification"});
        // }
        if(Email.slice(-10)!=='iiit.ac.in'){
            return res.status(400).json({success: false, message: "Please use IIIT email id"});
        }
        const check= await user.findOne({Email});
        if(check){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        else{
            const hashpassword= await bcrypt.hash(Password, 10);
            console.log(hashpassword);
            const newUser= new user({First_Name, Last_Name, Email, Password: hashpassword, Age, Contact_Number});
            await newUser.save();

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);

            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', //we need it to be true in https
                sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',  // it will be in same site in case of localhost
                maxAge: 7*24*60*60*1000 
            })
            return res.status(201).json({success: true, message: "User registered successfully", token});
        }

    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}

export const login = async(req, res) => {
    console.log("hiii");
    console.log(req);
    const { Email, Password} = req.body;
    console.log(req.body);
    if(!Email || !Password) {
        console.log(Email)
        return res.status(400).json({success: false, message: "All fields are required"});
    }
    try{
        // console.log("inside try");
        // const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
        //     params: {
        //       secret: RECAPTCHA_SECRET_KEY,
        //         response: token,
        //     },
        //   });
      
        // console.log("captcha login")
        // if(!recaptchaResponse.data.success) {
        //     return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
        //   }
        // console.log("captcha login")
        // if(Email.slice(-10)!=='iiit.ac.in'){
        //     return res.status(400).json({success: false, message: "Please use IIIT email id"});
        // }
        const existinguser = await user.findOne({Email});
        console.log(existinguser);
        console.log("ee");
        if(!existinguser){
            return res.status(400).json({success: false, message: "User doesn't exist"});
        }
        const checkpassword= await bcrypt.compare(Password, existinguser.Password);
        if(!checkpassword){
            return res.status(400).json({success: false, message: "Incorrect password"});
        }
        console.log("ee");
        const token = jwt.sign({id: existinguser._id}, process.env.JWT_SECRET);

        res.cookie('token', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',  
            maxAge: 7*24*60*60*1000 
        })
        return res.status(201).json({success: true, message: "User Logged in successfully", token});
    }
    catch(error){
        return res.status(500).json({success: false, message: "Something went wrong with Login. Try again later"});
    }
}

export const logout= async(req, res) => {
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: process.env.NODE_ENV !== 'development' ? 'none' : 'strict',  
        });
        return res.status(200).json({success: true, message: "Logged out successfully"});
    }
    catch(error){
        res.status(500).json({success: false, message: "Something went wrong with Logout"});
    }
}

export const authenticated = async(req, res) => {
    try{
        console.log('authenticated');
        console.log(req.userId);
        return res.status(200).json({success: true});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}