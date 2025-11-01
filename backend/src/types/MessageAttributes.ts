import { Character } from "./Character";

export interface MessageAttributes {
    id?: number;
    chatId: number;
    character: Character;
    role: "user" | "assistant" | "system";
    text: string;
    metadata?: object | null;
}
