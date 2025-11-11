import { Plus, PlusIcon, Trash } from "lucide-react";
import { Chat } from "../types/chat";

export default function Sidebar({
	history = [],
	selectedChatId = null,
	onSelectChat,
	onNewChat,
	onDeleteChat,
}: {
	history: Chat[];
	selectedChatId?: number | null;
	onSelectChat: (id: number) => void;
	onNewChat: () => void;
	onDeleteChat: (id: number) => void;
}) {
	return (
		<div
			className="w-[20%] max-w-[280px] shrink-0 p-6 overflow-y-auto flex flex-col"
			style={{
				backgroundColor: "var(--color-panel)",
				borderRight: "1px solid var(--color-border)",
			}}
		>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold p-4">History</h2>
				<button
					onClick={onNewChat}
					className="px-3 text-sm bg-accent text-bg"
				>
					<PlusIcon />
				</button>
			</div>

			{history.length > 0 ? (
				<div className="flex-1 overflow-y-auto history">
					{history.map((chat) => {
						const isActive = chat.id === selectedChatId;
						return (
							<div
								key={chat.id}
								onClick={() => onSelectChat(chat.id)}
								aria-current={isActive ? "true" : undefined}
								className={`cursor-pointer flex justify-between items-center p-2 px-3 border-b border-border rounded-lg mb-1 transition-all duration-300 ${
									isActive
										? "bg-accent/10 font-semibold scale-[1.02]"
										: "hover:bg-accent/10 scale-100"
								}`}
							>
								<span className="flex-1">{chat.title}</span>
								<button
									onClick={(e) => {
										e.stopPropagation();
										onDeleteChat(chat.id);
									}}
									className="text-sm text-400 px-2"
									title="Delete chat"
								>
									<Trash size={20} />
								</button>
							</div>
						);
					})}
				</div>
			) : (
				<div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic text-center">
					<h1 className="text-lg font-medium mb-2">
						Your chat history is empty
					</h1>
					<p className="text-sm">
						Start a new chat by clicking the{" "}
						<PlusIcon className="inline-block align-middle" />
					</p>
				</div>
			)}
		</div>
	);
}
