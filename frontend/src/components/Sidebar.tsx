import { Chat } from "../types/chat";

export default function Sidebar({
	history = [],
	onSelectChat,
	onNewChat,
	onDeleteChat
}: {
	history: Chat[];
	onSelectChat: (id: number) => void;
	onNewChat: () => void;
	onDeleteChat: (id: number) => void;
}) {
	return (
		<div
			className="w-[20%] max-w-[280px] shrink-0 p-6 overflow-y-auto"
			style={{
				backgroundColor: "var(--color-panel)",
				borderRight: "1px solid var(--color-border)",
			}}
		>
			<div className="flex justify-between items-center mb-4">
				<h2>History</h2>
				<button
					onClick={onNewChat}
					className="px-3 text-sm bg-accent text-bg"
				>
					New
				</button>
			</div>

			{history.length > 0 ? (
				history.map((chat) => (
					<div
						key={chat.id}
						onClick={() => onSelectChat(chat.id)}
						className="cursor-pointer flex justify-between items-center p-2 px-3 border-b border-border rounded-lg mb-1 
								transition-colors duration-200 hover:bg-accent/10"
					>
						<span
							className="flex-1"
						>
							{chat.title}
						</span>
						<button
							onClick={(e) => {
								e.stopPropagation();  // prevent selecting the chat
								onDeleteChat(chat.id);
							}}
							className="text-sm text-400 px-2"
							title="Delete chat"
						>
							Delete
						</button>
					</div>
				))
			) : (
				<div className="text-gray-500 italic">No chats yet</div>
			)}
		</div>
	);
}
