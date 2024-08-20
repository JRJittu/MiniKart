import User from '../models/useModels.js'
import asyncHandler from "../middlewares/asyncHandler.js"
import bcrypt from "bcryptjs"
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        throw new Error("Please enter all the details");
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error("Email Already Registered");
    }

    const salt = await bcrypt.genSalt(10)           // 10 chars whihc are addedn in password to encrypt the password
    const encryptPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: encryptPassword });

    try {
        await newUser.save()
        createToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            message:"User Created Successfully"
        })
    } catch (error) {
        res.status(400)
        throw new Error("Invalid User Data");
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all the details");
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        const isPasswordValid = await bcrypt.compare(password, existUser.password);

        if (isPasswordValid) {
            createToken(res, existUser._id);
            res.status(200).json({
                _id: existUser._id,
                username: existUser.username,
                email: existUser.email,
                isAdmin: existUser.isAdmin
            });
            return; // Exit function after sending response
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const logoutCurrentUser = asyncHandler(async (req, res)=>{
    res.cookie("jwt", "", {         // When user logged, their detail is in cookie named as jwt
        httpOnly: true,             // We make the cookie to empty string
        expires: new Date(0),
    })

    res.status(200).json({message:"Successfully Logged out"});
})

const getAllUsers = asyncHandler(async (req, res)=>{
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async (req, res)=>{
    const currentUser = await User.findById(req.user._id)      // .user is added in req by authenticate middleware

    if(currentUser){
        res.json({
            _id:currentUser._id,
            username:currentUser.username,
            email:currentUser.email,
            isAdmin:currentUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})

const updateCurrentUser = asyncHandler(async (req, res)=>{
    const currentUser = await User.findById(req.user._id)

    if(currentUser){
        currentUser.username = req.body.username || currentUser.username;
        currentUser.email = req.body.email || currentUser.email;
        
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const encryptPassword = await bcrypt.hash(req.body.password, salt);
            currentUser.password = encryptPassword;
        }

        const updatedUser = await currentUser.save();

        res.json({
            _id:updatedUser._id,
            username: updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            message:"Your data updated succesfully"
        })
    }
    else{
        res.status(404)
        throw new Error("User Not Found ...!")
    }
})

const deletUserById = asyncHandler(async (req, res)=>{
    const userTodlt = await User.findById(req.params.id);

    if(userTodlt){
        if(userTodlt.isAdmin){
            res.status(400)
            throw new Error("Cannot delete Admin")
        }
        await User.deleteOne({_id:userTodlt._id});
        res.json({message:"User is removed from database by Admin"})
    }
    else{
        res.status(404)
        throw new Error("User Not found");
    }
})

const getUserBydId = asyncHandler(async (req, res)=>{
    const specificUser = await User.findById(req.params.id).select("-password");
    if(specificUser){
        res.status(200).json(specificUser);
    }
    else{
        res.status(404)
        throw new Error("User Not found")
    }
})

const upDateUserById = asyncHandler(async (req, res)=>{
    const specificUser = await User.findById(req.params.id);

    if(specificUser){
        specificUser.username = req.body.username || specificUser.username;
        specificUser.email = req.body.email || specificUser.email;
        specificUser.isAdmin = Boolean(req.body.isAdmin);

        const upDatedUser = await specificUser.save();
        res.json({
            _id:upDatedUser._id,
            username:upDatedUser.username,
            message:"Specific user is Updated by admin",
        })
    }
    else{
        res.status(404)
        throw new Error("User Not found")
    }
})

export { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile,
    updateCurrentUser,
    deletUserById,
    getUserBydId,
    upDateUserById
};