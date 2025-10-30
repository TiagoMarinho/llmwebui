import { useState, useEffect } from "react";
import { Message } from "../types/message";
import { ROLE } from "../../../shared/role.js";
import { Settings } from "./useSettings";
import { Chat } from "../types/chat";

export default function useChat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [history, setHistory] = useState<Chat[]>([]);
	const [chatId, setChatId] = useState<number | null>(null);

	const loadChats = async () => {
		try {
			const res = await fetch("/api/v1/chats");
			const data = await res.json();
			const chats: Chat[] = data.chats || [];
			setHistory(chats);

			if (!chats.length) {
				// no chats exist, create default
				const id = await createChat("Alice");
				await loadMessages(id);
				setChatId(id);
				return;
			}

			const latestChatId = chats[0].id;
			await loadMessages(latestChatId);
			setChatId(latestChatId);
		} catch (err) {
			console.error(err);
		}
	};

	const createChat = async (character = "default") => {
		const res = await fetch("/api/v1/chats", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: "New Chat", character }),
		});
		const data = await res.json();
		setChatId(data.chat.id);
		await loadChats();
		setMessages([]);
		return data.chat.id;
	};

	const loadMessages = async (id: number) => {
		if (!id) return;
		try {
			const res = await fetch(`/api/v1/chats/${id}/messages`);
			const data = await res.json();
			setMessages(data.messages || []);
			setChatId(id);
		} catch (err) {
			console.error(err);
		}
	};

	const sendMessage = async (
		text: string,
		params: Settings,
		character: string
	) => {
		if (!chatId) return;
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

	useEffect(() => {
		loadChats();
	}, []);

	return { messages, history, chatId, createChat, loadMessages, sendMessage };
}
