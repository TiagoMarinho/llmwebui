import { Request, Response } from "express";
import { getMockResponse, splitIntoChunks } from "./responses.ts";

export async function handleChatRequest(req: Request, res: Response) {
	const { stream, character } = req.body;

	const mockText = getMockResponse(character as string);

	if (stream) {
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");

		const chunks = splitIntoChunks(mockText);

		for (const chunk of chunks) {
			const data = {
				choices: [
					{
						delta: { content: chunk },
					},
				],
			};

			res.write(`data: ${JSON.stringify(data)}\n\n`);
			await new Promise((resolve) => setTimeout(resolve, 50));
		}
		res.write("data: [DONE]\n\n");
		res.end();
	} else {
		res.json({
			id: `msg_${Math.random().toString(36).substring(2, 15)}`,
			choices: [
				{
					message: {
						role: "assistant",
						content: mockText,
					},
				},
			],
		});
	}
}
