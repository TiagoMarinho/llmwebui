import { Character } from "./character";

export interface Message {
	id?: number | string;
	role: string;
	text: string;
	character?: Character;
}
