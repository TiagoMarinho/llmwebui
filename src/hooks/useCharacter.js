import { useState, useEffect } from "react";

export default function useCharacter(selectedCharacter) {
	const [characterData, setCharacterData] = useState(null);

	useEffect(() => {
		// TODO: load character data for selectedCharacter from database
	}, [selectedCharacter]);

	const saveCharacter = async (data) => {
		// TODO: save character data to database
	};

	return { characterData, saveCharacter };
}
