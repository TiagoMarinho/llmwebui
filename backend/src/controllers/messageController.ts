import Message from "../models/Message.ts";
import Chat from "../models/Chat.ts";
import llmService from "../services/llmService.ts";

export const getMessages = async (req, res) => {
	try {
		const { chatId } = req.params;
		if (!chatId)
			return res.status(400).json({ error: "chatId is required" });

		const messages = await Message.findAll({ where: { chatId } });
		res.json({ messages });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getMessageById = async (req, res) => {
	try {
		const { chatId, id } = req.params;
		if (!chatId)
			return res.status(400).json({ error: "chatId is required" });

		const message = await Message.findOne({ where: { chatId, id } });
		if (!message)
			return res.status(404).json({ error: "Message not found" });

		res.json({ message });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const { chatId } = req.params;
		const { text, params, character } = req.body;
		const userMessage = await Message.create({
			text,
			role: "user",
			character,
			chatId,
		});
		await Chat.update({}, { where: { id: chatId }, silent: false });

		const llmResponse = await llmService.sendMessage(
			text,
			params,
			character,
		);

		await Message.create({
			text: llmResponse.response,
			role: "assistant",
			character,
			chatId,
		});

		res.json(llmResponse);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
