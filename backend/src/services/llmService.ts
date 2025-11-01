import { Character, Params } from "../types/index";


const sendMessage = async (text: string, params: Params, character: Character) => {
	// Call OpenAI API or local LLM
	const mockData = {
		response: "Hello, world!",
		params: '{"temperature": 0.7}',
		character: "Alice",
	};
	return mockData; // placeholder
};

export default { sendMessage };