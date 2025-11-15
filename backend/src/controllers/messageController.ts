import Message from "../models/Message.ts";
import Chat from "../models/Chat.ts";
import llmService from "../services/llmService.ts";
import { MessageAttributes } from "../types/MessageAttributes.ts";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage.ts";
import { Role } from "../types/Role.ts";
import Character from "../models/Character.ts";
import { Readable } from "stream";
import handleLLMStream from "../utils/handleLLMStream.ts";

export const getMessages = async (
	req: Request<MessageAttributes>,
	res: Response,
) => {
	try {
		const { chatId } = req.params;
		if (!chatId)
			return res.status(400).json({ error: "chatId is required" });

		const messages = await Message.findAll({
			where: { chatId },
			include: [
				{
					model: Character,
					as: "character",
					paranoid: false,
				},
			],
			order: [["createdAt", "ASC"]],
		});
		res.json({ messages });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const getMessageById = async (
	req: Request<MessageAttributes>,
	res: Response,
) => {
	try {
		const { chatId, id } = req.params;
		if (!chatId)
			return res.status(400).json({ error: "chatId is required" });

		const message = await Message.findOne({
			where: { chatId, id },
			include: [
				{
					model: Character,
					as: "character",
				},
			],
		});
		if (!message)
			return res.status(404).json({ error: "Message not found" });

		res.json({ message });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const sendMessage = async (req: Request, res: Response) => {
	try {
		const chatId = parseInt(req.params.chatId, 10);
		if (isNaN(chatId)) {
			return res.status(400).json({ error: "Invalid Chat ID" });
		}

		const { text, params, character } = req.body;

		await Message.create({
			text,
			role: Role.User,
			characterId: character.id,
			chatId,
		});

		await Chat.update({}, { where: { id: chatId }, silent: false });

		const llmStream = await llmService.sendMessage(text, params, character);
		if (!llmStream)
			return res.status(500).json({ error: "LLM Unavailable" });

		await handleLLMStream(res, llmStream, chatId, character.id);
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const updateMessage = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const chatId = parseInt(req.params.chatId, 10);
		if (!chatId || !id)
			return res.status(400).json({ error: "chatId and id is required" });

		const message = await Message.findByPk(id);
		if (!message)
			return res.status(404).json({ error: "Message not found" });

		const { text, params, character } = req.body;

		message.text = text;
		await message.save();

		if (message.role !== Role.User) {
			console.log("Detected assistant role, skipping LLM call");
			return res.json({ message });
		}

		console.log("Detected user role, calling LLM");

		const llmStream = await llmService.sendMessage(text, params, character);
		if (!llmStream)
			return res.status(500).json({ error: "LLM Unavailable" });

		await handleLLMStream(res, llmStream, chatId, character.id);
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};

export const deleteMessage = async (req: Request, res: Response) => {
	try {
		const { chatId, id } = req.params;
		if (!chatId)
			return res.status(400).json({ error: "chatId is required" });

		const message = await Message.findByPk(id);
		if (!message)
			return res.status(404).json({ error: "Message not found" });

		await message.destroy();

		res.status(200).json({ message });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};
