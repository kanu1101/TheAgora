import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        req: true,
    },
    password: {
        type: String,
        req: true,
        minlength: 6,
    },
    profilePic: {
        type: String,
        default: "", 
    },
    email: {
        type: String,
        req: true,
        unique: true,
    },
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);

export default User;