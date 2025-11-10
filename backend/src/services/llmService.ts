import { Character, Params } from "../types/index";

interface MockResponse {
	choices?: { message?: { content?: string } }[];
}

const MOCK_API_URL =
	process.env.MOCK_API_URL || "http://localhost:3000/v1/chat/completions";

const sendMessage = async (
	text: string,
	params: Params,
	character: Character,
) => {
	try {
		const response = await fetch(MOCK_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				model: "mock-llm",
				messages: [{ role: "user", content: text }],
				stream: false,
				character: character.name || character,
				temperature: params?.temperature ?? 0.7,
			}),
		});

		const data = (await response.json()) as MockResponse;
		const message =
			data?.choices?.[0]?.message?.content ?? "Mock LLM Error";

		return { response: message };
	} catch (error) {
		console.error("Mock LLM call failed:", error);
		return { response: "Mock LLM Unavailable" };
	}
};

export default { sendMessage };
