import jwt from 'jsonwebtoken';


//to verify the cookie
export const userauth = async(req, res, next) => {
    const {token} = req.cookies;

    console.log("eeeeegdgfdhd");
    console.log(req);
    console.log("c-c-dfd-g-f-df-hgf-h-df--ds-d-fg-fd-df-ghd-g-----------------------------------------------------");
    console.log("token",token);
    if(!token){
        return res.status(401).json({success: false, message: "Please Login Again"});
    }
    try{
        const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedtoken.id){
            req.userId = decodedtoken.id;
            console.log(req.userId);
            console.log(req);
        }
        else{
            return res.status(401).json({success: false, message: "Please Login Again"});
        }
        
        next();
    }
    catch(error){
        return res.status(401).json({success: false, message: error.message});
    }

};