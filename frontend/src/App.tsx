import { useState, JSX } from "react";
import { VIEW } from "./shared/view";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import SettingsPanel from "./components/SettingsPanel";
import CharacterEditor from "./components/CharacterEditor";
import ThemeToggler from "./components/ThemeToggler";

import useChat from "./hooks/useChat";
import useCharacter from "./hooks/useCharacter";
import useSettings from "./hooks/useSettings";

type ViewComponent = () => JSX.Element;
type ViewMap = {
	[key: string]: ViewComponent;
};

function ViewRouter({ view, map }: { view: string; map: ViewMap }) {
	const View = map[view];
	return View ? <View /> : null;
}

export default function App() {
	const [selectedCharacter, setSelectedCharacter] = useState("Alice");
	const [view, setView] = useState(VIEW.CHAT);

	const {
		messages,
		history,
		chatId,
		createChat,
		deleteChat,
		loadMessages,
		sendMessage,
	} = useChat();
	const { characterData, saveCharacter } = useCharacter(selectedCharacter);
	const { params, setParams } = useSettings();

	const views = {
		[VIEW.CHAT]: () => (
			<>
				<Sidebar
					history={history}
					onSelectChat={(id) => loadMessages(id)}
					onNewChat={() => createChat(selectedCharacter)}
					onDeleteChat={(id) => deleteChat(id)}
				/>
				<ChatWindow
					messages={messages}
					onSend={(text: string) =>
						sendMessage(text, params, selectedCharacter)
					}
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
		<div className="flex h-screen w-screen">
			<ViewRouter view={view} map={views} />

			<SettingsPanel
				params={params}
				setParams={setParams}
				selectedCharacter={selectedCharacter}
				setSelectedCharacter={setSelectedCharacter}
				view={view}
				setView={setView}
			/>

			<ThemeToggler />
		</div>
	);
}
