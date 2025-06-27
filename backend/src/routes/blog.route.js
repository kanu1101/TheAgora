import express from "express";
import { commentOnBlog, deleteBlog, deleteComment, editBlog, getBlog, getComments, likeBlog, postBlog, unlikeBlog } from "../controllers/blog.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get('/:id', getBlog);
router.get('/:id/comments', getComments);
router.post('/', protectRoute, postBlog);
router.post('/like/:id',protectRoute, likeBlog);
router.post('/comment/:id', protectRoute, commentOnBlog);
router.post('/unlike/:id', protectRoute, unlikeBlog);
router.put('/edit/:id',protectRoute, editBlog);
router.delete('/deleteComment/:blogId/:commentId',protectRoute, deleteComment);
router.delete('/deleteBlog/:id',protectRoute, deleteBlog);


export default router