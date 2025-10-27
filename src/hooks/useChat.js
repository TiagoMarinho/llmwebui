import { useState, useEffect } from "react";

export default function useChat() {
	const [messages, setMessages] = useState([]);
	const [history, setHistory] = useState([]);

	useEffect(() => {
		// TODO: load chat history from database or localStorage
	}, []);

	const sendMessage = async (text, params, character) => {
		// TODO: send message to API/LLM and update messages state
	};

	return { messages, setMessages, history, sendMessage };
}
