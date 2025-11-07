import { useState, useEffect } from "react";
import { Message } from "../types/message";
import { Role } from "../types/role";
import { Settings } from "./useSettings";
import { Chat } from "../types/chat";
import { Character } from "../types/character";

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

			if (chats.length === 0) return;

			const latestChatId = chats[0].id;
			await loadMessages(latestChatId);
			setChatId(latestChatId);
		} catch (err) {
			console.error(err);
		}
	};

	const createChat = async (characterId: number) => {
		// Step 1: Create the chat with a temporary title
		const createRes = await fetch("/api/v1/chats", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: "New Chat...", characterId }), // Placeholder title
		});
		const createData = await createRes.json();
		const newChat = createData.chat;
		const newChatId = newChat.id;


		// Step 2: Immediately update the chat with the desired title
		const finalTitle = `Chat #${newChatId}`;
		await fetch(`/api/v1/chats/${newChatId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: finalTitle }),
		});

		// Step 3: Refresh state and set the new chat as active
		setChatId(newChatId);
		await loadChats(); // Refreshes the history list with the final title
		setMessages([]);
		return newChatId;
	};

	const deleteChat = async (id: number) => {
		try {
			if (!id) return;

			const isDeletingCurrent = id === chatId;
			const currentIndex = history.findIndex((c) => c.id === id);

			await fetch(`/api/v1/chats/${id}`, { method: "DELETE" });

			const updatedHistory = history.filter((c) => c.id !== id);
			setHistory(updatedHistory);

			if (!isDeletingCurrent) return;

			const nextChatId =
				updatedHistory[currentIndex]?.id ||
				updatedHistory[currentIndex - 1]?.id ||
				updatedHistory[0]?.id ||
				null;

			setChatId(nextChatId);
			await loadMessages(nextChatId);
		} catch (err) {
			console.error("Failed to delete chat:", err);
		}
	};

	const loadMessages = async (id: number | null) => {
		if (!id) {
			setMessages([]);
			return;
		}
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
		character: Character,
	) => {
		const currentChatId = chatId ?? (await createChat(character.id));
		if (!chatId) await loadMessages(currentChatId);

		const userMessage: Message = {
			role: Role.User,
			text,
			character, // User's message is associated with the selected character to know who it's directed to
		};

		setMessages((prev) => [...prev, userMessage]);

		const res = await fetch(`/api/v1/chats/${currentChatId}/messages`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text, params, character }),
		});
		const data = await res.json();

		setMessages((prev) => [...prev, data.message]);
		loadChats();
	};

	useEffect(() => {
		loadChats();
	}, []);

	return {
		messages,
		history,
		chatId,
		createChat,
		deleteChat,
		loadMessages,
		sendMessage,
	};
}