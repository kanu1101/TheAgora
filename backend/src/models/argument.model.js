import mongoose, { mongo } from "mongoose";

const ArgumentSchema = new mongoose.Schema({
    debateId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "debateModel",
    },
    debateModel: {
        type: String,
        required: true,
        enum: ["CoreDebate", "UserDebate"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,

    },
    side:{
        type: String,
        required: true,
        enum: ["for", "against"],
    }
}, {timestamps: true})

const Argument = mongoose.model("Argument", ArgumentSchema);

export default Argument;