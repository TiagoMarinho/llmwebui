import { Settings } from "../hooks/useSettings";
import { VIEW } from "../shared/view";

interface SettingsPanelProps {
	params: Settings;
	setParams: (params: Settings) => void;
	saveSettings: (params: Settings) => void;
	selectedCharacter: string;
	setSelectedCharacter: (character: string) => void;
	view: string;
	setView: (view: VIEW) => void;
}

export default function SettingsPanel({
	params,
	setParams,
	saveSettings,
	selectedCharacter,
	setSelectedCharacter,
	view,
	setView,
}: SettingsPanelProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSettings = {
			...params,
			[e.target.name]: parseFloat(e.target.value),
		};
		setParams(newSettings);
		saveSettings(newSettings);
	};
	const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCharacter(e.target.value);
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
					max="1"
					name="temperature"
					value={params?.temperature}
					onChange={handleChange}
					className="w-full mt-1 mb-2"
				/>
			</label>

			<label className="block mb-4">
				Character:
				<select
					value={selectedCharacter}
					onChange={handleCharacterChange}
					className="w-full mt-1 mb-2"
				>
					<option value="Alice">Alice</option>
					<option value="Bob">Bob</option>
					<option value="Charlie">Charlie</option>
				</select>
			</label>

			{view === "chat" ? (
				<button
					onClick={() => setView(VIEW.CHARACTER_EDITOR)}
					className="w-full mt-4"
				>
					Edit Character
				</button>
			) : (
				<button
					onClick={() => setView(VIEW.CHAT)}
					className="w-full mt-4"
				>
					← Back to Chat
				</button>
			)}
		</div>
	);
}
