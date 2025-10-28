import { useState } from "react";

import { VIEW } from "./shared/view";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import SettingsPanel from "./components/SettingsPanel";
import CharacterEditor from "./components/CharacterEditor";

import useChat from "./hooks/useChat";
import useCharacter from "./hooks/useCharacter";
import useSettings from "./hooks/useSettings";

import "./App.css"

export default function App() {
	const [selectedCharacter, setSelectedCharacter] = useState("Alice");
	const [view, setView] = useState(VIEW.CHAT); // "chat" or "characterEditor"

	const { messages, history, sendMessage } = useChat();
	const { characterData, saveCharacter } = useCharacter(selectedCharacter);
	const { params, setParams } = useSettings();

	return (
		<div className="app">
			{view === "chat" ? (
				<>
					<Sidebar history={history} />
					<ChatWindow
						messages={messages}
						onSend={(text) => sendMessage(text, params, selectedCharacter)}
					/>
				</>
			) : (
					<CharacterEditor 
						character={characterData} 
						saveCharacter={saveCharacter}
						setView={setView} 
					/>
			)}

			<SettingsPanel
				params={params}
				setParams={setParams}
				selectedCharacter={selectedCharacter}
				setSelectedCharacter={setSelectedCharacter}
				view={view}
				setView={setView}
			/>
		</div>
	);
}
