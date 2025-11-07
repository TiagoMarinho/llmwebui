export interface CharacterAttributes {
	id?: number;
	name: string;
	description?: string | null;
	avatarUrl?: string | null;
	systemPrompt?: string | null;
	deletedAt?: Date | null;
}