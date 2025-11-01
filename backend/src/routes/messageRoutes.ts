import { Router } from "express";
import {
	getMessages,
	sendMessage,
	getMessageById,
} from "../controllers/messageController.ts";

const router = Router();

router.get("/:chatId/messages", getMessages);
router.get("/:chatId/messages/:id", getMessageById);
router.post("/:chatId/messages", sendMessage);

export default router;
