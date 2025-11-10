import { Role } from "./Role.ts";

export interface MessageAttributes {
	id?: number;
	chatId: number;
	characterId: number;
	role: Role;
	text: string;
	metadata?: object | null;
}