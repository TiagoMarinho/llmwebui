export interface Character {
	id: number;
	name: string;
	description?: string | null;
	avatarUrl?: string | null;
	story?: string | null;
}