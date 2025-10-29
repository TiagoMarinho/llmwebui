import { useState } from "react";
import { VIEW } from "./shared/view";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import SettingsPanel from "./components/SettingsPanel";
import CharacterEditor from "./components/CharacterEditor";

import useChat from "./hooks/useChat";
import useCharacter from "./hooks/useCharacter";
import useSettings from "./hooks/useSettings";

import "./App.css";

function ViewRouter({ view, map }) {
	const View = map[view];
	return View ? <View /> : null;
}

export default function App() {
	const [selectedCharacter, setSelectedCharacter] = useState("Alice");
	const [view, setView] = useState(VIEW.CHAT);

	const { messages, history, sendMessage } = useChat();
	const { characterData, saveCharacter } = useCharacter(selectedCharacter);
	const { params, setParams } = useSettings();

	const views = {
		[VIEW.CHAT]: () => (
			<>
				<Sidebar history={history} />
				<ChatWindow
					messages={messages}
					onSend={(text) => sendMessage(text, params, selectedCharacter)}
				/>
			</>
		),
		[VIEW.CHARACTER_EDITOR]: () => (
			<CharacterEditor
				selectedCharacter={selectedCharacter}
				saveCharacter={saveCharacter}
				setView={setView}
			/>
		),
	};

	return (
		<div className="app">
			<ViewRouter view={view} map={views} />

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
