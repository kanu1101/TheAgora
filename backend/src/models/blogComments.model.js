import mongoose from "mongoose";

const BlogCommentSchema = new mongoose.Schema({
    commenterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    content: {
        type: String, 
        required: true,
        maxlength: 500,
        trim: true,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Blog"
    },
}, {timestamps: true})

const BlogComment = mongoose.model("BlogComment", BlogCommentSchema);

export default BlogComment;