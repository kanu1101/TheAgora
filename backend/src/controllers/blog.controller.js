import Blog from "../models/blog.model.js"
import BlogComment from "../models/blogComments.model.js";
import User from "../models/user.model.js"
export const getBlogs = async (req, res) => {
    try {
        const {page = 1, limit = 10} = req.query;
        const blogs = await Blog.find().skip((page-1)*10).limit(Number(limit)).populate("authorId", "userName profilePic");

        return res.status(200).json(blogs);
    } catch (error) {
        console.log("error in getBlogs controller", error.message);
        return res.status(500).json({message: "internal server error"});
    }
}
export const getBlog = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId).populate("authorId", "profilePic userName");
        if(!blog){
            return res.status(400).json({message:"Couldn't find the blog you were looking for."});
        }
        return res.status(200).json(blog);
    } catch (error) {
        console.log("error in blog controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const getComments = async (req, res) => {
    try {
        const {id: blogId} = req.params;
        const blog = await Blog.findById(blogId).populate("comments");
        if(!blog){
            return res.status(404).json({message: "couldn't find the blog you were looking for."})
        }
        return res.status(200).json(blog.comments);

    } catch (error) {
        console.log("error in getcomments controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const postBlog = async (req, res) => {
    try {
        const {content, title} = req.body;
        if(!title || !content) return res.status(400).json({message: "fill all the required details"});
        const {_id : userId} = req.user;
        const blog = new Blog({
            title: title,
            content: content,
            authorId: userId
        })

        await blog.save();
        return res.status(200).json(blog);
    } catch (error) {    
        console.log("error in posting blog controller: ", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const likeBlog = async (req, res) => {
    try {
        const {id: blogId} = req.params;
        const {_id : userId} = req.user;
        const blog = await Blog.findByIdAndUpdate(blogId, {$addToSet: {likedBy: userId}}, {new: true}).populate("likedBy");
        if (!blog) {
            return res.status(404).json({ message: "Blog not found." });
        }
        return res.status(200).json(blog);
    } catch (error) {
        console.log("error in likeBlog controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAuthorBlogs = async (req, res) => {
    try {
        const {user} = req.user;
        const blogs = await Blog.find({authorId: user._id}).populate("authorId", "username profilePic");
        if(!blogs) return res.status(404).json({message: "no blogs found."});
        return res.status(200).json(blogs);
    } catch (error) {
        console.log("error in getAuthorBlogs blog controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const commentOnBlog = async (req, res) => {
    try {
        const {id: blogId} = req.params;
        const { _id: userId } = req.user;
        const { content } = req.body;
        const trimmedContent = content.trim();
        if(!trimmedContent) return res.status(400).json({message: "no content found in the comment"});
        if(trimmedContent.length > 500) return res.status(400).json({message: "Comment Size exceeds 500 character limit"});
        const comment = new BlogComment({
            blogId: blogId,
            content: trimmedContent,
            commenterId: userId
        })
        await comment.save();
        const blog = await Blog.findByIdAndUpdate(blogId, {$addToSet: {comments: comment._id}}, {new: true});
        return res.status(200).json(comment);
    } catch (error) {
        console.log("error in commentBlog controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const unlikeBlog = async (req, res) => {
    try {
        const {id: blogId} = req.params;
        const {_id : userId} = req.user;
        const blog = await Blog.findByIdAndUpdate(blogId, {$pull: {likedBy: userId}}, {new: true});
        if(!blog) return res.status(400).json({message: "no blog found"});
        return res.status(200).json(blog)
    } catch (error) {
        console.log("error in unlikeBlog controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const deleteBlog = async (req, res) => {
    try {
        const {id : blogId} = req.params;
        const {_id: userId} = req.user;
        const blog = await Blog.findById(blogId);
        if(!blog) return res.status(404).json({message: "blog not found."});
        if(blog.authorId.toString() !== userId.toString()){
            return res.status(403).json({message: "Unauthorized"});
        }
        await BlogComment.deleteMany({blogId});
        await Blog.findByIdAndDelete(blogId);
        return res.status(200).json(blog);
    } catch (error) {
        console.log("error in deleteBlog controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const deleteComment = async (req, res) => {
    try {
        const {blogId, commentId} = req.params;
        const {_id: userId} = req.user;
        const comment = await BlogComment.findById(commentId);
        if(!comment){
            return res.status(404).json({message: "comment not found."})
        } 
        if(comment.commenterId.toString() !== userId.toString()) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const blog = await Blog.findByIdAndUpdate(blogId, {$pull: {comments: comment._id}}, {new: true});
        if(!blog){
            return res.status(404).json({message: "blog not found."})
        }
        await BlogComment.findByIdAndDelete(commentId);
        return res.status(200).json({message: "comment deleted successfully."});
    } catch (error) {
        console.log("error in deleteComment controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export const editBlog = async (req, res) => {
    try {
        const {title, content} = req.body;
        if(!title || !content){
            return res.status(400).json({message: "fill in the required fields"});
        }
        const {id: blogId} = req.params;
        const {_id: userId} = req.user;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message: "blog not found"});
        }
        if(blog.authorId.toString() !== userId.toString()){
            return res.status(403).json({message: "Unauthorized"});
        }
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {title: title, content: content}, {new: true});
        return res.status(200).json(updatedBlog);
    } catch (error) {
        console.log("error in editBlog controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}