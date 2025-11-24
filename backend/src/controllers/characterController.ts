import Character from "../models/Character.ts";
import { Request, Response } from "express";
import { CharacterAttributes } from "../types/CharacterAttributes.ts";
import { getErrorMessage } from "../utils/getErrorMessage.ts";
import path from "path";
import fs from "fs";

export const getCharacters = async (
	req: Request<CharacterAttributes>,
	res: Response,
) => {
	try {
		const characters = await Character.findAll({
			order: [["createdAt", "ASC"]],
		});
		res.json({ characters });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const getCharacterById = async (
	req: Request<CharacterAttributes>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const character = await Character.findByPk(id);
		if (!character)
			return res.status(404).json({ error: "Character not found" });
		res.json({ character });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const createCharacter = async (req: Request, res: Response) => {
	try {
		let { name, description, avatarUrl, story } = req.body;

		if (!name || typeof name !== "string" || !name.trim()) {
			return res.status(400).json({ error: "Name is required" });
		}

		const baseUrl = `${req.protocol}://${req.get("host")}`;
		const avatarPath = req.file
			? `${baseUrl}/uploads/avatars/${req.file.filename}`
			: avatarUrl || null;

		const character = await Character.create({
			name: name.trim(),
			description: description?.trim() || null,
			avatarUrl: avatarPath,
			story: story?.trim() || null,
		});
		res.status(201).json({ character });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const updateCharacter = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		let characterData = req.body;

		const charId = characterData.id || id;

		const character = await Character.findByPk(charId);
		if (!character)
			return res.status(404).json({ error: "Character not found" });

		if (
			characterData.name &&
			typeof characterData.name === "string" &&
			characterData.name.trim()
		) {
			character.name = characterData.name.trim();
		}

		if (req.file) {
			if (character.avatarUrl?.startsWith("/uploads/avatars/")) {
				const oldPath = path.join(
					__dirname,
					"../",
					character.avatarUrl,
				);

				if (fs.existsSync(oldPath)) {
					fs.unlinkSync(oldPath);
				}
			}

			const baseUrl = `${req.protocol}://${req.get("host")}`;
			character.avatarUrl = `${baseUrl}/uploads/avatars/${req.file.filename}`;
		} else if (characterData.avatarUrl !== undefined) {
			character.avatarUrl = characterData.avatarUrl?.trim() || null;
		}

		character.description = characterData?.description?.trim() ?? null;
		character.story = characterData?.story?.trim() ?? null;

		await character.save();
		res.json({ character });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const deleteCharacter = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const character = await Character.findByPk(id);
		if (!character)
			return res.status(404).json({ error: "Character not found" });

		await character.destroy();

		res.status(200).json({ message: "Character deleted successfully", id });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};
