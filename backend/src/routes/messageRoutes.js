import { Router } from "express";
import { getMessage, getMessageById } from "../controllers/messageController.js";

const router = Router();
router.get('/', getMessage);
router.post('/:id', getMessageById);

export default router;