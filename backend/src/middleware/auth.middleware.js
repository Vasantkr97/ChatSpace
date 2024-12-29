import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export const userMiddleware = async (req, res, next) => {

    try {
        const token = req.cookies.jwtToken;

        if (!token) {
            return res.status(401).json({ msg: "Unauthorized - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({ msg: "Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ msg: "User not found"});
        }

        req.user = user;
        
        next()

    }catch (error) {
        console.log("Error in the usermiddleware", error.message)
        res.status(500).json(({msg: "Internal server Error"}))
    }
}