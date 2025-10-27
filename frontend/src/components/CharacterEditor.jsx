export default function CharacterEditor({ selectedCharacter, setView }) {
	return (
		<div className="character-editor">
			<h1>Editing: {selectedCharacter}</h1>

			{/* Example character info */}
			<div className="character-info">
				<p>Picture, stats, description, etc.</p>
			</div>

			<button className="back-button" onClick={() => setView("chat")}>
				← Back to Chat
			</button>
		</div>
	);
}
  