import responses from "./responses.json" with { type: "json" };

export function getMockResponse(): string {
	const randomIndex = Math.floor(Math.random() * responses.length);
	return responses[randomIndex];
}

export function splitIntoChunks(text: string): string[] {
	return text.split(" ").map((word) => word + " ");
}
