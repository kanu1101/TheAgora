import User from "../models/user.model.js"
import Argument from "../models/argument.model.js"
import CoreDebate from "../models/coreDebate.model.js"
import UserDebate from "../models/userDebate.model.js"
import { response } from "express"

export const getCoreDebates = async (req, res) => {
    try {
        const debateTitles = await CoreDebate.find({}, "title");
        if(debateTitles.length === 0) return res.status(404).json({message: "couldn't find what you were looking for."});
        return res.status(200).json(debateTitles);
    } catch (error) {
        console.log("error in getcoredebates controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const getUserDebates = async (req, res) => {
    try {
        const {page = 1, limit = 10} = req.query;
        const debateTitles = await UserDebate.find().skip((page-1)*10).limit(Number(limit)).populate({path: "authorId", select: "userName profilePic"});
        if(debateTitles.length === 0) return res.status(404).json({message: "couldn't find what you were looking for."});
        return res.status(200).json(debateTitles);
    } catch (error) {
        console.log("error in getUserDebates controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const createUserDebate = async (req, res) => {
    try {
        const {title, description} = req.body;
        const trimmedTitle = title.trim();
        const trimmedDescription = description?.trim() || "";
        if(!trimmedTitle) return res.status(400).json({message: "fill in the required fields"});
        const {_id: userId} = req.user;
        const debate = new UserDebate({
            authorId: userId,
            title: trimmedTitle,
            description: trimmedDescription,
        })
        await debate.save();
        return res.status(200).json(debate);
    } catch (error) {
        console.log("error in createUserDebate controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const deleteUserDebate = async (req, res) => {
    try {
        const {debateId} = req.params;
        const {_id: userId} = req.user;
        const debate = await UserDebate.findById(debateId);
        if(!debate){
            return res.status(404).json({message: "The debate doesn't exist."});
        }
        if(!debate.authorId.equals(userId)){
            return res.status(403).json({message: "Unauthorized"});
        }
        await Argument.deleteMany({debateId, debateModel: "UserDebate"});
        await UserDebate.findByIdAndDelete(debateId);

        return res.status(200).json({message: "User Debate deleted."});
    } catch (error) {
        console.log("error in deleteUserDebate controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const editUserDebate = async (req, res) => {
    try {
        const {debateId} = req.params;
        const {_id: userId} = req.user;
        const {title, description} = req.body;
        const debate = await UserDebate.findById(debateId);
        if(!debate){
            return res.status(404).json({message: "The debate doesn't exist."});
        }
        if(!debate.authorId.equals(userId)){
            return res.status(403).json({message: "Unauthorized"});
        }
        const updatedDebate = await UserDebate.findByIdAndUpdate(debateId, {title: title, description: description}, {new: true});
        
        return res.status(200).json(updatedDebate);
    } catch (error) {
        console.log("error in editUserDebate controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const searchUserDebates = async (req, res) => {
    try {
        const {search} = req.body;
        const rawSearch = search?.trim();
        if(!rawSearch) return res.status(401).json({message: "empty search query"})
        const escapedSearch = rawSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedSearch, "i");
        const debates = await UserDebate.find({title: regex}, "title");
        if(debates.length ===0) return res.status(404).json({message: "no debates found"});
        return res.status(200).json(debates);
    } catch (error) {
        console.log("error in searchUserDebates controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const getArgumentsForDebate = async (req, res) => {
    try {
        const {debateId} = req.params;
        const {type} = req.query;
        if(!["core", "user"].includes(type)){
            return res.status(400).json({message: "invalid debate type"});
        }
        const debateModel = type === "core" ? CoreDebate : UserDebate;
        const debate = await debateModel.findById(debateId).populate({path : "arguments", populate: {path: "authorId", select: "userName profilePic"},});
        if(!debate){
            return res.status(404).json({message: "debate not found."});
        }

        return res.status(200).json(debate);
        
    } catch (error) {
        console.log("error in getArgumentsForDebate controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const makeArgument = async (req, res) => {
    try {
        const {debateId} = req.params;
        const {content, side} = req.body;
        const {_id : userId} = req.user;
        const {type} = req.query;
        const trimmedContent = content?.trim();
        if(!trimmedContent){
            return res.status(400).json({message: "argument cannot be empty"})
        }
        if(!["for", "against"].includes(side)){
            return res.status(400).json({message: "invalid side"});
        }
        if(!["core", "user"].includes(type)){
            return res.status(400).json({message: "invalid debate type"});
        }
        const debateModel = type === "core" ? CoreDebate : UserDebate;
        const modelName = type === "core" ? "CoreDebate" : "UserDebate";

        const debate = await debateModel.findById(debateId);
        if(!debate){
            return res.status(404).json({message: "debate not found.."});
        }
        const argument = new Argument({
            debateModel : modelName,
            authorId : userId,
            side : side,
            content : trimmedContent,
            debateId: debateId,
        })
        await argument.save();
        await debateModel.findByIdAndUpdate(debateId, {$push: {arguments: argument._id}}, {new: true});
        return res.status(200).json(argument);
    } catch (error) {
        console.log("error in makeArgument controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const deleteArgument = async (req, res) => {
    try {
        const {debateId, argumentId} = req.params;
        const {_id: userId} = req.user;
        const {type} = req.query;
        if(!["core", "user"].includes(type)){
            return res.status(400).json({message: "invalid debate type"});
        }
        const debateModel = type === "core" ? CoreDebate : UserDebate;
        const modelName = type === "core" ? "CoreDebate" : "UserDebate" ;
        const argument = await Argument.findById(argumentId);
        if(!argument){
            return res.status(404).json({message: "argument not found"});
        }
        if (
            !argument.authorId.equals(userId) ||
            argument.debateId.toString() !== debateId ||
            argument.debateModel !== modelName
        ) {
            return res.status(403).json({ message: "Unauthorized." });
        }
        const debate = await debateModel.findByIdAndUpdate(debateId, {$pull: {arguments: argument._id}}, {new: true});
        if(!debate){
            return res.status(404).json({message: "debate not found.."});
        }
        await Argument.findByIdAndDelete(argumentId);
        return res.status(200).json({message: "argument deleted"});
    } catch (error) {
        console.log("error in deleteArgument controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
export const editArgument = async (req, res) => {
    try {
        const {argumentId, debateId} = req.params;
        const {_id: userId} = req.user;
        const {content} = req.body;
        const {type} = req.query;
        const trimmedContent = content.trim();
        if(!trimmedContent) {
            return res.status(400).json({message:  "no text entered."})
        }
        if(!["core", "user"].includes(type)){
            return res.status(400).json({message: "invalid debate type"});
        }
        const modelName = type === "core" ? "CoreDebate" : "UserDebate";
        const argument = await Argument.findById(argumentId);
        if(!argument){
            return res.status(404).json({message: "argument not found."})
        }
        if(!argument.authorId.equals(userId) || argument.debateId.toString() !== debateId || argument.debateModel.toString() !== modelName){
            return res.status(403).json({message: "Unauthorized."});
        }
        const updatedArgument = await Argument.findByIdAndUpdate(argumentId, {content: trimmedContent}, {new: true});
        return res.status(200).json(updatedArgument);
    } catch (error) {
        console.log("error in editArgument controller", error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}