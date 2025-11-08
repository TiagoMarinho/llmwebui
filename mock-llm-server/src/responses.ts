export const mockResponses = {
	default: "Hello! How can I assist you today?",

	characters: {
		Alice: "Hi there! I'm Alice, Klee's mom. How can I help you?",
		Bob: "Hey! I'm Bob, the builder! What do you need?",
		Charlie: "Greetings! I'm Charlie, Lola's Brother. Ask me anything!",
	} as {
		[character: string]: string;
	},
};

export function getMockResponse(character: string | string[]): string {
	if (Array.isArray(character)) {
		const responses = character.map(
			(char) =>
				`[${char}]: ${mockResponses.characters[char] || mockResponses.default}`,
		);
		return responses.join("\n\n") || mockResponses.default;
	}

	if (character in mockResponses.characters) {
		return `[${character}]: ${mockResponses.characters[character]}`;
	}

	return `[Assistant]: ${mockResponses.default}`;
}

export function splitIntoChunks(text: string): string[] {
	return text.split(" ").map((word) => word + " ");
}
