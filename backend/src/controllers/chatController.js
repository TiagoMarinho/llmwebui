import llmService from '../services/llmService.js';
import Message from '../models/Message.js';

export const sendMessage = async (req, res) => {
	const { text, params, character } = req.body;
	const response = await llmService.sendMessage(text, params, character);
	console.log("MSG SENT!")

	//const message = await Message.create({ text, role: 'user', character });
	//await Message.create({ text: response, role: 'assistant', character });

	res.json({ response });
};
