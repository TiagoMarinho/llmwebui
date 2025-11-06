import { Request, Response } from "express";
import { UserAttributes } from "../types/UserAttributes.ts";
import { getErrorMessage } from "../utils/getErrorMessage.ts";
import User from "../models/User.ts";

export const getUserSettings = async (
	req: Request<UserAttributes>,
	res: Response,
) => {
	try {
		let settings = await User.findOne({ where: { id: 1 } });

		if (!settings) {
			settings = await User.create({
				id: 1,
				username: "default",
			});
		}
		return res.json(settings);
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const upsertUserSettings = async (
	req: Request<UserAttributes>,
	res: Response,
) => {
	try {
		const [settings] = await User.upsert({
			id: 1,
			username: "default",
			settings: req.body.settings,
		});

		return res.json(settings);
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};
