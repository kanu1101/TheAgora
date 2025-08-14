import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User doesn't exist."});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "email or password is incorrect."});
        generateToken(user._id, res);
        return res.status(201).json({
            userName: user.userName,
            email: user.email,
            _id: user._id,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log("error in login auth controller", error.message);
        return res.status(400).json({message: "Internal Server Error"});
    }
}

export const signup = async (req, res) => {
    const {userName, email, password} = req.body;
    try {
        if(!userName || !email || !password) {
            return res.status(600).json({message: "All fields are required."})
        }
        if(password.length < 6){
            return res.status(600).json({message: "password must be atleast 6 characters"});
        }
        const user = await User.findOne({email})
        if(user) {
            res.status(400).json({message: "User already exists. Please try to login."});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            userName,
            password: hashedPassword,
            email
        })
        if(newUser){    
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
            console.log("user created successfully");
        }


    } catch (error) {
        console.log("error in signup authController", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        console.log("logged out succesfully.")
        return res.status(201).json({message: "Logged Out Successfully"});
    } catch (error) {
        console.log("error in auth controller logout", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const checkAuth = (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}   

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
        const email = req.user.email;
        if(!profilePic){
            return res.status(500).json({message: "profile pic is not uploaded"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        console.log("cloudinary response: ", uploadResponse);

        const newUser = await User.findOneAndUpdate({email}, 
            { profilePic: uploadResponse.secure_url},
            { new: true },
        )
        console.log("User updated successfully");
        return res.status(200).json(newUser);
    } catch (error) {
        console.log("error in updateProfile controller: ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}