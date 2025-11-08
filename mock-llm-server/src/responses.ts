export const mockResponses = {
    default: "Hello! How can I assist you today?",

    characters: {
        Alice: "Hi there! I'm Alice, Klee's mom. How can I help you?",
        Bob: "Hey! I'm Bob, a friendly neighborhood builder. What do you need?",
        Charlie: "Greetings! I'm Charlie, a scholar of ancient lore. Ask me anything!",
    } as {
        [character: string]: string;
    }
};

export function getMockResponse(character: string): string {
    return mockResponses.characters[character] || mockResponses.default;
}

export function splitIntoChunks(text: string): string[] {
    // this simulates streaming by splitting the text into chunks of words
    return text.split(' ').map((word) => word + ' ');
}