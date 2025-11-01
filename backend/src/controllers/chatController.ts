import Chat from "../models/Chat.ts";

export const getChats = async (req, res) => {
	try {
		const chats = await Chat.findAll({
			order: [["updatedAt", "DESC"]],
		});
		res.json({ chats });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getChatById = async (req, res) => {
	try {
		const { id } = req.params;
		const chat = await Chat.findByPk(id);
		if (!chat) return res.status(404).json({ error: "Chat not found" });
		res.json({ chat });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createChat = async (req, res) => {
	try {
		let { title, character } = req.body;

		if (!character || typeof character !== "string" || !character.trim()) {
			return res.status(400).json({ error: "Character is required" });
		}

		if (!title || typeof title !== "string" || !title.trim()) {
			title = "Untitled Chat"; // localization needed
		}

		const chat = await Chat.create({
			title: title.trim(),
			character: character.trim(),
		});
		res.status(201).json({ chat });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteChat = async (req, res) => {
	try {
		const { id } = req.params;

		if (!id) return res.status(400).json({ error: "Chat ID is required" });

		const chat = await Chat.findByPk(id);
		if (!chat) return res.status(404).json({ error: "Chat not found" });

		await chat.destroy();

		res.status(200).json({ message: "Chat deleted successfully", id });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
