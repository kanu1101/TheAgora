import express from "express";
import { createUserDebate, deleteArgument, deleteUserDebate, editArgument, editUserDebate, getArgumentsForDebate, getCoreDebates, getUserDebates, makeArgument, searchUserDebates } from "../controllers/debate.controller.js";
import {protectRoute} from "../middlewares/auth.middleware.js"
const router = express.Router();

router.get('/coreDebates', getCoreDebates);
router.get('/userDebates', getUserDebates);
router.post('/createDebate', createUserDebate);
router.delete('/:debateId/deleteDebate',protectRoute, deleteUserDebate);
router.get('/:debateId/editDebate',protectRoute, editUserDebate);
router.get('/searchDebates/:searchValue', searchUserDebates);
router.get('/:debateId/arguments', getArgumentsForDebate);
router.post('/:debateId/createArgument',protectRoute, makeArgument);
router.delete('/:debateId/deleteArgument/:argumentId',protectRoute, deleteArgument);
router.put('/:debateId/editArgument/:argumentId',protectRoute, editArgument);

export default router;
