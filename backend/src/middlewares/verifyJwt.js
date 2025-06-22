const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyJwt = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) {
            return res.status(401).json({message: "Unauthorized request"});
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken?.id).select("-password -refreshToken");
        if(!user) {
            return res.status(401).json({message: "Invalid access token"});
        }
    
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message: `${error.message}` || "invalid access token"});   
    }
}

module.exports = verifyJwt;