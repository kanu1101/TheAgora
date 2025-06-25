import mongoose from "mongoose";

const UserDebateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        trim: true,
        maxlength: 1000,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    arguments: [{type: mongoose.Schema.Types.ObjectId, ref: "Argument"}]
}, {timestamps: true})

const UserDebate = mongoose.model("UserDebate", UserDebateSchema);

export default UserDebate;