import express from "express";
import { commentOnBlog, deleteBlog, deleteComment, editBlog, getBlog, getComments, likeBlog, postBlog, unlikeBlog } from "../controllers/blog.controller";
import {protectRoute} from "../middlewares/auth.middleware"
const router = express.Router();

router.get('/blog/:id', getBlog);
router.get('/blog/:id/comments', getComments);
router.post('/blog', protectRoute, postBlog);
router.post('/blog/like/:id',protectRoute, likeBlog);
router.post('/blog/comment/:id', protectRoute, commentOnBlog);
router.post('/blog/unlike/:id', protectRoute, unlikeBlog);
router.put('/blog/edit/:id',protectRoute, editBlog);
router.delete('/blog/deleteComment/:blogId/:commentId',protectRoute, deleteComment);
router.delete('/blog/deleteBlog/:id',protectRoute, deleteBlog);
