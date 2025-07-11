import mongoose from "mongoose";

const UserDebateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    // privacy: {
    //     type: String,
    //     enum: ["private", "public"],
    //     required: true,
    // },
    description:{
        type: String,
        trim: true,
        maxlength: 100,
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