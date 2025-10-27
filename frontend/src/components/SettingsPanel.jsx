export default function SettingsPanel({
	params,
	setParams,
	selectedCharacter,
	setSelectedCharacter,
	view,
	setView
}) {
	const handleChange = (e) => setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
	const handleCharacterChange = (e) => setSelectedCharacter(e.target.value);

	return (
		<div className="settings">
			<h2>Settings</h2>

			<label>
				Temperature:
				<input type="number" step="0.1" min="0" max="1" name="temperature" value={params?.temperature} onChange={handleChange} />
			</label>

			<label>
				Character:
				<select value={selectedCharacter} onChange={handleCharacterChange}>
					<option value="Alice">Alice</option>
					<option value="Bob">Bob</option>
					<option value="Charlie">Charlie</option>
				</select>
			</label>

			{view === "chat" ? (
				<button onClick={() => setView("characterEditor")}>
					Edit Character
				</button>
			) : (
				<button onClick={() => setView("chat")}>
					← Back to Chat
				</button>
			)}
		</div>
	);
}
  