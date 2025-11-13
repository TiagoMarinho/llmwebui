import { Role } from "../types/role";
import { Message } from "../types/message";

interface MessageBubbleProps {
	message: Message;
	onEdit: (id: string | number, text: string) => void;
	onDelete: (id: string | number, text: string) => void;
}

export default function MessageBubble({
	message,
	onEdit,
	onDelete,
}: MessageBubbleProps) {
	const isUser = message.role === Role.User;

	if (isUser) {
		return (
			<div className="flex justify-end">
				<div className="max-w-lg p-3 px-5 rounded-2xl wrap-break-words leading-relaxed bg-accent text-white max-h-96 overflow-y-auto">
					{message.text}
				</div>
			</div>
		);
	}

	const characterName = message.character ? message.character.name : "AI";
	const avatarUrl = message.character ? message.character.avatarUrl : "";
	const characterDescription = message.character?.description || "";
	const messageId = message.id;

	return (
		<div className="flex items-start gap-3">
			{avatarUrl && (
				<img
					src={avatarUrl}
					alt={`${characterName}'s avatar`}
					className="w-10 h-10 rounded-full"
					title={characterDescription}
				/>
			)}
			<div className="flex flex-col">
				<span
					className="text-sm font-semibold mb-1"
					title={characterDescription}
				>
					{characterName}
				</span>
				<div className="max-w-lg p-3 px-5 rounded-2xl wrap-break-words leading-relaxed bg-input text-text border border-border max-h-96 overflow-y-auto">
					{message.text}
				</div>
				<div className="opacity-0 group-hover:opacity-100 flex gap-1">
					{messageId != null && (
						<>
							<button
								onClick={() => onEdit(messageId, message.text)}
							>
								Edit
							</button>
							<button
								onClick={() =>
									onDelete(messageId, message.text)
								}
							>
								Delete
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
