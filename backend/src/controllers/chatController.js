import llmService from '../services/llmService.js';
import { Message } from '../db.js';
export const sendMessage = async (req, res) => {
	try {
		const { text, params, character } = req.body;
		const response = await llmService.sendMessage(text, params, character);

		await Message.create({ chatId: 1, character, role: 'user', text });
		await Message.create({ chatId: 1, character, role: 'assistant', text: response.response });

		res.json({ response });
	} catch (error) {
		if (error.message === 'SequelizeValidationError') {
			const errors = error.errors.map(err => err.message);
			return res.status(400).json({ errors });
		}
		res.status(500).json({ error: error.message });
	}
};
