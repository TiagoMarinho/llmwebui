import { Settings } from "../hooks/useSettings";

interface SettingsPanelProps {
	params: Settings;
	setParams: (params: Settings) => void;
	selectedCharacter: string;
	setSelectedCharacter: (character: string) => void;
	view: string;
	setView: (view: string) => void;
}

export default function SettingsPanel({
	params,
	setParams,
	selectedCharacter,
	setSelectedCharacter,
	view,
	setView,
}: SettingsPanelProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
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
					onClick={() => setView("characterEditor")}
					className="w-full mt-4"
				>
					Edit Character
				</button>
			) : (
				<button onClick={() => setView("chat")} className="w-full mt-4">
					← Back to Chat
				</button>
			)}
		</div>
	);
}
