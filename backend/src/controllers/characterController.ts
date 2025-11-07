import Character from "../models/Character.ts";
import { Request, Response } from "express";
import { CharacterAttributes } from "../types/CharacterAttributes.ts";
import { getErrorMessage } from "../utils/getErrorMessage.ts";

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
}

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

export const createCharacter = async (
	req: Request<CharacterAttributes>,
	res: Response,
) => {
	try {
		let { name, description, avatarUrl, systemPrompt } = req.body;

		if (!name || typeof name !== "string" || !name.trim()) {
			return res.status(400).json({ error: "Name is required" });
		}
		const character = await Character.create({
			name: name.trim(),
			description: description?.trim() || null,
			avatarUrl: avatarUrl?.trim() || null,
			systemPrompt: systemPrompt?.trim() || null,
		});
		res.status(201).json({ character });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const updateCharacter = async (
	req: Request,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const { id: _id, ...characterData } = req.body;

		const character = await Character.findByPk(id);
		if (!character)
			return res.status(404).json({ error: "Character not found" });

		if (characterData.name && typeof characterData.name === "string" && characterData.name.trim()) {
			character.name = characterData.name.trim();
		}

		if (characterData.description !== undefined) {
			character.description =
				typeof characterData.description === "string" && characterData.description.trim()
					? characterData.description.trim()
					: null;
		}

		if (characterData.avatarUrl !== undefined) {
			character.avatarUrl =
				typeof characterData.avatarUrl === "string" && characterData.avatarUrl.trim()
					? characterData.avatarUrl.trim()
					: null;
		}

		if (characterData.systemPrompt !== undefined) {
			character.systemPrompt =
				typeof characterData.systemPrompt === "string" && characterData.systemPrompt.trim()
					? characterData.systemPrompt.trim()
					: null;
		}
		await character.update(characterData);
		res.json({ character });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
}

export const deleteCharacter = async (
	req: Request,
	res: Response,
) => {
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
}