import { Role } from "../types/role";
import { Message } from "../types/message";

export default function MessageBubble({ message }: { message: Message }) {
	const isUser = message.role === Role.User;

	if (isUser) {
		return (
			<div className="flex justify-end">
				<div className="max-w-lg p-3 px-5 rounded-2xl break-words leading-relaxed bg-accent text-white max-h-96 overflow-y-auto">
					{message.text}
				</div>
			</div>
		);
	}

	const characterName = message.character ? message.character.name : "AI";
	const avatarUrl = message.character ? message.character.avatarUrl : "";
	const characterDescription = message.character?.description || "";

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
				<div className="max-w-lg p-3 px-5 rounded-2xl break-words leading-relaxed bg-input text-text border border-border max-h-96 overflow-y-auto">
					{message.text}
				</div>
			</div>
		</div>
	);
}