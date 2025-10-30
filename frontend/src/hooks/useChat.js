import { useState, useEffect } from "react";
import { ROLE } from '../../../shared/role.js'

export default function useChat() {
	const [messages, setMessages] = useState([]);
	const [history, setHistory] = useState([]);

	const getMessages = async () => {
		const res = await fetch('/api/v1/messages');
		const data = await res.json();
		setMessages(data.messages);
	};

	useEffect(() => {
		getMessages();
	}, []);

	const sendMessage = async (text, params, character) => {
		console.log('sendMessage', text, params, character);
		const res = await fetch('/api/v1/chat/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, params, character }),
		});
		const data = await res.json();
		setMessages(prev => [...prev, { role: ROLE.USER, text }, { role: ROLE.ASSISTANT, text: data.response.response }]);
	};

	return { messages, setMessages, history, sendMessage };
}
