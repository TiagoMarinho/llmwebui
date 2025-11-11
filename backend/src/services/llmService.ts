import { CharacterAttributes, Params } from "../types/index";

interface MockResponse {
	choices?: { message?: { content?: string } }[];
}

const MOCK_API_URL =
	process.env.MOCK_API_URL || "http://localhost:3001/v1/chat/completions";

const sendMessage = async (
	text: string,
	params: Params,
	character: CharacterAttributes,
) => {
	try {
		const response = await fetch(MOCK_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: "mock-llm",
				messages: [{ role: "user", content: text }],
				stream: true,
				temperature: params?.temperature ?? 0.7,
			}),
		});

		return response.body;

	} catch (error) {
		console.error("Mock LLM call failed:", error);
		return new ReadableStream({
			start(controller) {
				controller.enqueue("Mock LLM Unavailable");
				controller.close();
			}
		})
	}
};

export default { sendMessage };