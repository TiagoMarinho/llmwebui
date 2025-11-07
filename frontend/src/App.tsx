import { useState, JSX } from "react";
import { VIEW } from "./shared/view";

import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import SettingsPanel from "./components/SettingsPanel";
import CharacterEditor from "./components/CharacterEditor";
import ThemeToggler from "./components/ThemeToggler";
import CharacterCreator from "./components/CharacterCreator";

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
	const [view, setView] = useState(VIEW.CHAT);

	const {
		messages,
		history,
		createChat,
		deleteChat,
		loadMessages,
		sendMessage,
	} = useChat();

	const {
		characters,
		selectedCharacter,
		selectCharacter,
		updateCharacter,
		createCharacter,
		deleteCharacter,
	} = useCharacter();

	const { params, setParams } = useSettings();

	const handleCreateChat = () => {
		if (selectedCharacter) {
			createChat(selectedCharacter.id);
		} else {
			console.error("No character selected to create chat.");
		}
	};

	const handleSendMessage = (text: string) => {
		if (selectedCharacter) {
			sendMessage(text, params, selectedCharacter);
		} else {
			console.error("No character selected to send message.");
		}
	};

	const views = {
		[VIEW.CHAT]: () => (
			<>
				<Sidebar
					history={history}
					onSelectChat={(id) => loadMessages(id)}
					onNewChat={handleCreateChat}
					onDeleteChat={(id) => deleteChat(id)}
				/>
				<ChatWindow
					messages={messages}
					onSend={handleSendMessage}
				/>
			</>
		),
		[VIEW.CHARACTER_EDITOR]: () => (
			<CharacterEditor
				selectedCharacter={selectedCharacter}
				updateCharacter={updateCharacter}
				deleteCharacter={deleteCharacter}
				setView={setView}
			/>
		),
		[VIEW.CHARACTER_CREATOR]: () => (
			<CharacterCreator
				createCharacter={createCharacter}
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
				characters={characters}
				selectedCharacter={selectedCharacter}
				selectCharacter={selectCharacter}
				view={view}
				setView={setView}
			/>

			<ThemeToggler />
		</div>
	);
}