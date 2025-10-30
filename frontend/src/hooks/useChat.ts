import { useState, useEffect } from "react";
import { ROLE } from "../../../shared/role.js";
import { Message } from "../types/message";

export default function useChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [history, setHistory] = useState([]);
	const chatId = 1; // placeholder until chats are implemented

	const getMessages = async () => {
		const res = await fetch(`/api/v1/chats/${chatId}/messages`);
		const data = await res.json();
		setMessages(data.messages);
	};

	useEffect(() => {
		getMessages();
	}, []);

	const sendMessage = async (text: string, params: any, character: string) => {
		const res = await fetch(`/api/v1/chats/${chatId}/messages`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text, params, character }),
		});
		const data = await res.json();
		setMessages((prev) => [
			...prev,
			{ role: ROLE.USER, text },
			{ role: ROLE.ASSISTANT, text: data.response },
		]);
	};

	return { messages, setMessages, history, sendMessage };
}
