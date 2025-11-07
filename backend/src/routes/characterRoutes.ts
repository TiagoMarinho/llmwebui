import { Router } from "express";
import {
	getCharacters,
	getCharacterById,
	createCharacter,
	deleteCharacter,
	updateCharacter,
} from "../controllers/characterController.ts";

const router = Router();

router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);
router.delete("/:id", deleteCharacter);
router.put("/:id", updateCharacter);

export default router;