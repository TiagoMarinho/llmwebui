import Chat from "../models/Chat.ts";
import { Request, Response } from "express";
import { ChatAttributes } from "../types/ChatAttributes.ts";
import { getErrorMessage } from "../utils/getErrorMessage.ts";

export const getChats = async (req: Request<ChatAttributes>, res: Response) => {
	try {
		const chats = await Chat.findAll({
			order: [["updatedAt", "DESC"]],
		});
		res.json({ chats });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const getChatById = async (
	req: Request<ChatAttributes>,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const chat = await Chat.findByPk(id);
		if (!chat) return res.status(404).json({ error: "Chat not found" });
		res.json({ chat });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const createChat = async (
	req: Request<ChatAttributes>,
	res: Response,
) => {
	try {
		let { title } = req.body;

		if (!title || typeof title !== "string" || !title.trim()) {
			title = "Untitled Chat"; // localization needed
		}

		const chat = await Chat.create({
			title: title.trim(),

		});
		res.status(201).json({ chat });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const deleteChat = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) return res.status(400).json({ error: "Chat ID is required" });

		const chat = await Chat.findByPk(id);
		if (!chat) return res.status(404).json({ error: "Chat not found" });

		await chat.destroy();

		res.status(200).json({ message: "Chat deleted successfully", id });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const updateChat = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { title } = req.body;

		if (!id) return res.status(400).json({ error: "Chat ID is required" });
		if (!title || typeof title !== "string" || !title.trim()) {
			return res.status(400).json({ error: "A valid title is required" });
		}

		const chat = await Chat.findByPk(id);
		if (!chat) return res.status(404).json({ error: "Chat not found" });

		chat.title = title.trim();
		await chat.save();

		res.status(200).json({ chat });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};
