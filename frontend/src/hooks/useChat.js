import { useState, useEffect } from "react";
import { ROLE } from '../../../shared/role.js'

export default function useChat() {
	const [messages, setMessages] = useState([]);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		// TODO: load chat history from database or localStorage
	}, []);

	const sendMessage = async (text, params, character) => {
		const res = await fetch('/api/v1/chat/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, params, character }),
		});
		const data = await res.json();
		setMessages(prev => [...prev, { role: ROLE.USER, text }, { role: ROLE.ASSISTANT, text: data.response }]);
	};

	return { messages, setMessages, history, sendMessage };
}
