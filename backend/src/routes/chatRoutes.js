import { Router } from "express";
import { getChats, getChatById, createChat } from "../controllers/chatController.js";

const router = Router();

router.get("/", getChats);
router.get("/:id", getChatById);
router.post("/", createChat);

export default router;