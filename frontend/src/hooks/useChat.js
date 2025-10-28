import { useState, useEffect } from "react";

export default function useChat() {
	const [messages, setMessages] = useState([]);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		// TODO: load chat history from database or localStorage
	}, []);

	const sendMessage = async (text, params, character) => {
		const res = await fetch('http://localhost:5000/api/chat/send', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text, params, character }),
		});
		const data = await res.json();
		setMessages(prev => [...prev, { role: 'user', text }, { role: 'bot', text: data.response }]);
	};

	return { messages, setMessages, history, sendMessage };
}
