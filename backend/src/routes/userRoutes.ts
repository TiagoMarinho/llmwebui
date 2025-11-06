import { Router } from "express";
import {
	getUserSettings,
	upsertUserSettings,
} from "../controllers/userController.ts";

const router = Router();

router.get("/settings", getUserSettings);
router.post("/settings", upsertUserSettings);

export default router;
