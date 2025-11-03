import { Character } from "./Character";
import { Role } from "./Role";

export interface MessageAttributes {
	id?: number;
	chatId: number;
	character: Character;
	role: Role;
	text: string;
	metadata?: object | null;
}
