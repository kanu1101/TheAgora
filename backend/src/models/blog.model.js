import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxlength: 50,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "BlogComment"
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, {timestamps: true})

BlogSchema.virtual("likedCount").get(function () {
    return this.likedBy.length;
});

BlogSchema.virtual("commentCount").get(function () {
    return this.comments.length;
})

BlogSchema.set("toJSON", {virtuals: true});
BlogSchema.set("toObject", {virtuals: true});

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;