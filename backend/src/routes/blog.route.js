import express from "express";
import { commentOnBlog, deleteBlog, deleteComment, editBlog, getAuthorBlogs, getBlog, getBlogs, getComments, likeBlog, postBlog, unlikeBlog } from "../controllers/blog.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get('/getBlogs', getBlogs);
router.get('/:blogId', getBlog);
router.get('/:id/comments', getComments);
router.post('/createBlog', protectRoute, postBlog);
router.post('/:id/like',protectRoute, likeBlog);
router.post('/:id/comment', protectRoute, commentOnBlog);
router.post('/:id/unlike', protectRoute, unlikeBlog);
router.put('/:id/edit',protectRoute, editBlog);
router.delete('/:blogId/deleteComment/:commentId',protectRoute, deleteComment);
router.delete('/:id/deleteBlog',protectRoute, deleteBlog);
router.get('/getAuthorBlogs', protectRoute, getAuthorBlogs);


export default router