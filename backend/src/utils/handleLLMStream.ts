import { Response } from "express";
import { Readable } from "stream";
import Message from "../models/Message.ts";
import { Role } from "../types/Role.ts";

const handleLLMStream = async (
	res: Response,
	llmStream: ReadableStream,
	chatId: number,
	characterId: number,
): Promise<void> => {
	res.setHeader("Content-Type", "text/event-stream");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("Connection", "keep-alive");

	const stream = Readable.fromWeb(llmStream as any);
	let llmResponseText = "";
	const decoder = new TextDecoder();

	stream.on("data", (chunk) => {
		res.write(chunk);
		llmResponseText += decoder.decode(chunk);
	});

	return new Promise((resolve, reject) => {
		stream.on("end", async () => {
			try {
				const cleanText = llmResponseText
					.split("\n")
					.filter((line) => line.startsWith("data: "))
					.map((line) => {
						const jsonStr = line.replace("data: ", "").trim();
						if (jsonStr === "[DONE]") return null;
						try {
							return JSON.parse(jsonStr).choices[0].delta.content;
						} catch {
							return null;
						}
					})
					.filter(Boolean)
					.join("");

				if (cleanText) {
					await Message.create({
						text: cleanText,
						role: Role.Assistant,
						characterId,
						chatId,
					});
				}
				res.end();
				resolve();
			} catch (err) {
				reject(err);
			}
		});

		stream.on("error", reject);
	});
};

export default handleLLMStream;
