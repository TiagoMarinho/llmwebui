import { Router } from "express";
import {
	getSettingsProfile,
	upsertSettingsProfile,
} from "../controllers/userController.ts";

const router = Router();

router.get("/", getSettingsProfile);
router.post("/", upsertSettingsProfile);

export default router;
