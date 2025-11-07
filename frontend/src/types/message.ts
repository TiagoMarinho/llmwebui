import { Character } from "./character";

export interface Message {
	id?: number;
	role: string;
	text: string;
	character: Character;
}