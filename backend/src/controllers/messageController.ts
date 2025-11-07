import Message from "../models/Message.ts";
import Chat from "../models/Chat.ts";
import llmService from "../services/llmService.ts";
import { MessageAttributes } from "../types/MessageAttributes.ts";
import { Request, Response } from "express";
import { getErrorMessage } from "../utils/getErrorMessage.ts";
import { Role } from "../types/Role.ts";
import Character from "../models/Character.ts";

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

export const sendMessage = async (
	req: Request<MessageAttributes>,
	res: Response,
) => {
	try {
		const { chatId } = req.params;
		const { text, params, character } = req.body;
		const userMessage = await Message.create({
			text,
			role: Role.User,
			characterId: character.id,
			chatId,
		});
		await Chat.update({}, { where: { id: chatId }, silent: false });

		const llmResponse = await llmService.sendMessage(
			text,
			params,
			character,
		);

		const assistantMessage = await Message.create({
			text: llmResponse.response,
			role: Role.Assistant,
			characterId: character.id,
			chatId,
		});

		const messageWithCharacter = await Message.findByPk(assistantMessage.id, {
			include: [
				{
					model: Character,
					as: "character",
				},
			],
		});

		res.json({ message: messageWithCharacter });
	} catch (err) {
		res.status(500).json({ error: getErrorMessage(err) });
	}
};