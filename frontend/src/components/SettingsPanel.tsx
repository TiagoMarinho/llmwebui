import { useEffect, useState, useRef } from "react";
import { Settings } from "../hooks/useSettings";
import { VIEW } from "../shared/view";
import { Character } from "../types/character";

interface SettingsPanelProps {
	params: Settings;
	setParams: (params: Settings) => void;
	saveSettings: (params: Settings) => void;
	characters: Character[];
	selectedCharacter: Character | null;
	selectCharacter: (id: number) => void;
	view: string;
	setView: (view: VIEW) => void;
}

export default function SettingsPanel({
	params,
	setParams,
	saveSettings,
	characters,
	selectedCharacter,
	selectCharacter,
	view,
	setView,
}: SettingsPanelProps) {
	const [inputValue, setInputValue] = useState(
		params?.temperature?.toString() || "",
	);

	const isEditingRef = useRef(false);

	useEffect(() => {
		if (isEditingRef.current) return;
		setInputValue(params?.temperature?.toString() || "");
	}, [params?.temperature]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (/^\d*\.?\d*$|^\.\d*$/.test(value)) {
			setInputValue(value);

			const validNumberPattern = /^(\d+(\.\d+)?|\.\d+)$/;
			if (validNumberPattern.test(value)) {
				const parsed = parseFloat(value);
				const newSettings = {
					...params,
					[e.target.name]: parsed,
				};
				setParams(newSettings);
				saveSettings(newSettings);
			}
		}
	};

	const handleFocus = () => {
		isEditingRef.current = true;
	};

	const handleBlur = () => {
		isEditingRef.current = false;

		const validNumberPattern = /^(\d+(\.\d+)?|\.\d+)$/;
		if (validNumberPattern.test(inputValue)) {
			const parsed = parseFloat(inputValue);
			const newSettings = {
				...params,
				["temperature"]: parsed,
			};
			setParams(newSettings);
			saveSettings(newSettings);
		} else {
			setInputValue(params?.temperature?.toString() || "");
		}
	};
	const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		selectCharacter(Number(e.target.value));
	};

	return (
		<div className="w-[20%] max-w-[280px] shrink-0 p-6 overflow-y-auto bg-panel border-r border-border">
			<h2 className="mb-4">Settings</h2>

			<label className="block mb-4">
				Temperature:
				<input
					type="number"
					step="0.1"
					min="0"
					max="2"
					inputMode="decimal"
					name="temperature"
					value={inputValue}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className="w-full mt-1 mb-2"
				/>
			</label>

			<label className="block mb-4">
				Character:
				<select
					value={selectedCharacter?.id || ""}
					onChange={handleCharacterChange}
					className="w-full mt-1 mb-2"
					disabled={characters.length === 0}
				>
					{characters.length === 0 ? (
						<option>No characters found</option>
					) : (
						characters.map((character) => (
							<option key={character.id} value={character.id}>
								{character.name}
							</option>
						))
					)}
				</select>
			</label>

			<div className="space-y-4">
				<button
					onClick={() => setView(VIEW.CHARACTER_CREATOR)}
					className="w-full"
				>
					+ New Character
				</button>

				{view === "chat" ? (
					<button
						onClick={() => setView(VIEW.CHARACTER_EDITOR)}
						className="w-full"
						disabled={!selectedCharacter}
					>
						Edit Character
					</button>
				) : (
					<button
						onClick={() => setView(VIEW.CHAT)}
						className="w-full"
					>
						← Back to Chat
					</button>
				)}
			</div>
		</div>
	);
}
