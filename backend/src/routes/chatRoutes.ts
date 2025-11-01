import { Router } from "express";
import {
	getChats,
	getChatById,
	createChat,
	deleteChat,
} from "../controllers/chatController.ts";

const router = Router();

router.get("/", getChats);
router.get("/:id", getChatById);
router.post("/", createChat);
router.delete("/:id", deleteChat);

export default router;
