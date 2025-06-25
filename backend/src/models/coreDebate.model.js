import mongoose from "mongoose";

const CoreDebateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    arguments: [{type: mongoose.Schema.Types.ObjectId, ref: "Argument"}]
}, {timestamps: true})

const CoreDebate = mongoose.model("CoreDebate", CoreDebateSchema);

export default CoreDebate;