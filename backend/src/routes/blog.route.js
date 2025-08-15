import express from "express";
import { commentOnBlog, deleteBlog, deleteComment, editBlog, getAuthorBlogs, getBlog, getBlogs, getComments, likeBlog, postBlog, unlikeBlog } from "../controllers/blog.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get('/getBlogs', getBlogs);
router.get('/getAuthorBlogs', protectRoute, getAuthorBlogs);
router.post('/createBlog', protectRoute, postBlog);
router.get('/:id/comments', getComments);
router.get('/:blogId', getBlog);
router.post('/:id/like',protectRoute, likeBlog);
router.post('/:id/comment', protectRoute, commentOnBlog);
router.post('/:id/unlike', protectRoute, unlikeBlog);
router.put('/:id/edit',protectRoute, editBlog);
router.delete('/:blogId/deleteComment/:commentId',protectRoute, deleteComment);
router.delete('/:id/deleteBlog',protectRoute, deleteBlog);


export default router