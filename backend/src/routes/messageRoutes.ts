import { Router } from "express";
import {
	getMessages,
	sendMessage,
	updateMessage,
	deleteMessage,
	getMessageById,
} from "../controllers/messageController.ts";

const router = Router();

router.get("/:chatId/messages", getMessages);
router.get("/:chatId/messages/:id", getMessageById);
router.post("/:chatId/messages", sendMessage);
router.delete("/:chatId/messages/:id", deleteMessage);
router.put("/:chatId/messages/:id", updateMessage);

export default router;
