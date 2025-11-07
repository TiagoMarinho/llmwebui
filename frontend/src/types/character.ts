export interface Character {
	id: number;
	name: string;
	description?: string | null;
	avatarUrl?: string | null;
	systemPrompt?: string | null;
}