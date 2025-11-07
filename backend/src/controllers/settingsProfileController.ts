import { Request, Response } from "express";
import { SettingsProfileAttributes } from "../types/SettingsProfileAttributes.ts";
import { getErrorMessage } from "../utils/getErrorMessage.ts";
import SettingsProfile from "../models/SettingsProfile.ts";

export const getSettingsProfile = async (
	req: Request<SettingsProfileAttributes>,
	res: Response,
) => {
	try {
		let settings = await SettingsProfile.findOne({ where: { id: 1 } });

		if (!settings) {
			settings = await SettingsProfile.create({
				id: 1,
				name: "default",
			});
		}
		return res.json(settings);
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const upsertSettingsProfile = async (
	req: Request<SettingsProfileAttributes>,
	res: Response,
) => {
	try {
		const [settings] = await SettingsProfile.upsert({
			id: 1,
			name: "default",
			settings: req.body.settings,
		});

		return res.json(settings);
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};
