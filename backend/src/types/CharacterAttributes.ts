export interface CharacterAttributes {
	id?: number;
	name: string;
	description?: string | null;
	avatarUrl?: string | null;
	story?: string | null;
	deletedAt?: Date | null;
}