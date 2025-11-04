import { Router } from "express";
import {
	getChats,
	getChatById,
	createChat,
	deleteChat,
	updateChat,
} from "../controllers/chatController.ts";

const router = Router();

router.get("/", getChats);
router.get("/:id", getChatById);
router.post("/", createChat);
router.delete("/:id", deleteChat);
router.put("/:id", updateChat);

export default router;
