import jwt from "jsonwebtoken"
import User from "../models/useModels.js"
import asyncHandler from "./asyncHandler.js"

/* Authenticate : to check current user */
const authenticate = asyncHandler(async (req, res, next)=>{
    let token;

    // read jwt from jwt cookie of logined user
    token = req.cookies.jwt          // Once a cookie is set, for all consequent request, it will automatically attached to request header

    if(token){
        try {
            const decodedJwt = jwt.verify(token, process.env.JWT_SECRETE);
            req.user = await User.findById(decodedJwt.userId).select("-password");  // means get all except password
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }
    else{
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

// Check for the admin
const authorizeAdmin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401).send({ message: "Not authorized as an admin" });
    }
}

export {authenticate, authorizeAdmin};