import Message from '../models/Message.js';


export const getMessage = async (req, res) => {
    try {
        const { chatId } = req.query;
        if (chatId == null) return res.json({ messages: [] });

        const messages = await Message.findAll({ where: { chatId } });

        res.json({ messages });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        if (id == null) return res.status(400).json({ error: 'Message ID is required' });

        const message = await Message.findByPk(id);
        if (message == null) return res.status(404).json({ error: 'Message not found' });

        res.json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


