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

	const createChat = async () => {
		const createRes = await fetch("/api/v1/chats", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: "New Chat..." }),
		});
		const createData = await createRes.json();
		const newChat = createData.chat;
		const newChatId = newChat.id;

		const finalTitle = `Chat #${newChatId}`;
		await fetch(`/api/v1/chats/${newChatId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: finalTitle }),
		});

		setChatId(newChatId);
		await loadChats();
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
		const currentChatId = chatId ?? (await createChat());
		if (!chatId) await loadMessages(currentChatId);

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: Role.User,
			text,
			character,
		};
		setMessages((prev) => [...prev, userMessage]);

		const res = await fetch(`/api/v1/chats/${currentChatId}/messages`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text, params, character }),
		});

		if (!res.body) return;
		const reader = res.body.getReader();
		const decoder = new TextDecoder();

		const assistantMessage: Message = {
			id: crypto.randomUUID(),
			role: Role.Assistant,
			text: "",
			character,
		};
		setMessages((prev) => [...prev, assistantMessage]);

		let buffer = "";
		const processStream = async () => {
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					await loadChats();
					break;
				}

				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";

				for (const line of lines) {
					if (!line.startsWith("data: ")) continue;

					const jsonStr = line.substring(5).trim();
					if (jsonStr === "[DONE]") continue;

					try {
						const parsed = JSON.parse(jsonStr);
						const content =
							parsed.choices?.[0]?.delta?.content || "";

						setMessages((prev) =>
							prev.map((msg) =>
								msg.id === assistantMessage.id
									? { ...msg, text: msg.text + content }
									: msg,
							),
						);
					} catch (error) {
						console.error("Failed to parse stream chunk:", error);
					}
				}
			}
		};
		await processStream();
	};

	const editMessage = async (id: string | number, text: string) => {
		console.log("editMessage called", id, text);
	};

	const deleteMessage = async (id: string | number) => {
		console.log("deleteMessage called", id);
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
		editMessage,
		deleteMessage,
	};
}
