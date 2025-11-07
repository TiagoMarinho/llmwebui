import { useState, useEffect } from "react";
import { Character } from "../types/character";

export default function useCharacter() {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null,
	);

	const loadCharacters = async () => {
		try {
			const res = await fetch("/api/v1/characters");
			const data = (await res.json()) as { characters: Character[] };
			const fetchedCharacters = data.characters || [];

			setCharacters(fetchedCharacters);

			const currentSelectedId = selectedCharacter?.id;
			const reselected = fetchedCharacters.find(
				(c) => c.id === currentSelectedId,
			);

			if (reselected) {
				setSelectedCharacter(reselected);
			} else if (fetchedCharacters.length > 0) {
				setSelectedCharacter(fetchedCharacters[0]);
			} else {
				setSelectedCharacter(null);
			}
		} catch (err) {
			console.error("Error loading characters:", err);
			setCharacters([]);
			setSelectedCharacter(null);
		}
	};



	useEffect(() => {
		loadCharacters();
	}, []);

	const selectCharacter = (id: number) => {
		const characterToSelect = characters.find((c) => c.id === id);
		if (characterToSelect) {
			setSelectedCharacter(characterToSelect);
		}
	};

	const createCharacter = async (
		characterData: Omit<Character, "id">,
	) => {
		try {
			const res = await fetch("/api/v1/characters", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(characterData),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to create character");
			}

			const data = (await res.json()) as { character: Character };
			const newCharacter = data.character;

			setCharacters((prev) => [...prev, newCharacter]);
			setSelectedCharacter(newCharacter);

		} catch (err) {
			alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
		}
	};

	const updateCharacter = async (characterData: Character) => {
		try {
			const res = await fetch(`/api/v1/characters/${characterData.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(characterData),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to update character");
			}
			const data = (await res.json()) as { character: Character };
			const updatedCharacter = data.character;

			// Update the character in the list
			const updatedList = characters.map((c) =>
				c.id === updatedCharacter.id ? updatedCharacter : c,
			);
			setCharacters(updatedList);
			if (selectedCharacter?.id === updatedCharacter.id) {
				setSelectedCharacter(updatedCharacter);
			}
		} catch (err) {
			alert(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
		}
	};

	const deleteCharacter = async (id: number) => {
		try {
			const res = await fetch(`/api/v1/characters/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Failed to delete character");

			const updatedList = characters.filter((c) => c.id !== id);
			setCharacters(updatedList);

			if (selectedCharacter?.id === id) {
				setSelectedCharacter(updatedList[0] || null);
			}
		} catch (err) {
			console.error("Error deleting character:", err);
		}
	};

	return {
		characters,
		selectedCharacter,
		selectCharacter,
		createCharacter,
		updateCharacter,
		deleteCharacter,
		loadCharacters,
	};
}