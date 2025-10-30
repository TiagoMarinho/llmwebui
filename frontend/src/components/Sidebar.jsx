export default function Sidebar({ history = [], onSelectChat, onNewChat }) {
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
					className="px-3 py-1 text-sm rounded-lg bg-accent text-bg"
				>
					New
				</button>
			</div>

			{history.length > 0 ? (
				history.map((chat) => (
					<div
						key={chat.id}
						onClick={() => onSelectChat(chat.id)}
						className="p-2 px-3 border-b border-border rounded-lg mb-1 cursor-pointer 
								transition-colors duration-200 hover:bg-accent/10"
					>
						{chat.title}
					</div>
				))
			) : (
				<div className="text-gray-500 italic">No chats yet</div>
			)}
		</div>
	);
}