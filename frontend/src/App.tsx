import { useState, useCallback } from "react";
import { VIEW } from "./shared/view";

import ChatView from "./components/ChatView";
import CharacterEditor from "./components/CharacterEditor";
import CharacterCreator from "./components/CharacterCreator";

import Sidebar from "./components/Sidebar";
import SettingsPanel from "./components/SettingsPanel";
import ThemeToggler from "./components/ThemeToggler";

import useChat from "./hooks/useChat";
import useCharacter from "./hooks/useCharacter";
import useSettings from "./hooks/useSettings";

export default function App() {
	const [view, setView] = useState(VIEW.CHAT);

	const {
		messages,
		history,
		createChat,
		deleteChat,
		loadMessages,
		sendMessage,
		editMessage,
		deleteMessage,
	} = useChat();

	const {
		characters,
		selectedCharacter,
		selectCharacter,
		updateCharacter,
		createCharacter,
		deleteCharacter,
	} = useCharacter();

	const { params, setParams, saveSettings } = useSettings();

	const handleCreateChat = () => {
		if (selectedCharacter) createChat();
	};

	const handleSendMessage = useCallback(
		(text: string) => {
			if (selectedCharacter) {
				sendMessage(text, params, selectedCharacter);
			}
		},
		[sendMessage, params, selectedCharacter],
	);

	const handleEditMessage = useCallback(
		(id: string | number, text: string) => {
			if (selectedCharacter) {
				editMessage(id, text, params, selectedCharacter);
			}
		},
		[editMessage, params, selectedCharacter],
	);

	const handleDeleteMessage = useCallback(
		(id: string | number) => {
			if (selectedCharacter) {
				deleteMessage(id);
			}
		},
		[deleteMessage, selectedCharacter],
	);

	const renderCurrentView = () => {
		const views = {
			[VIEW.CHARACTER_EDITOR]: (
				<CharacterEditor
					selectedCharacter={selectedCharacter}
					updateCharacter={updateCharacter}
					deleteCharacter={deleteCharacter}
					setView={setView}
				/>
			),
			[VIEW.CHARACTER_CREATOR]: (
				<CharacterCreator
					createCharacter={createCharacter}
					setView={setView}
				/>
			),
			[VIEW.CHAT]: (
				<ChatView
					messages={messages}
					onSend={handleSendMessage}
					onEdit={handleEditMessage}
					onDelete={handleDeleteMessage}
				/>
			),
		};
		return views[view];
	};

	return (
		<div className="flex h-screen w-screen">
			<Sidebar
				history={history}
				onSelectChat={loadMessages}
				onNewChat={handleCreateChat}
				onDeleteChat={deleteChat}
			/>

			{renderCurrentView()}

			<SettingsPanel
				params={params}
				setParams={setParams}
				saveSettings={saveSettings}
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
