import { Role } from "../types/role";
import { Message } from "../types/message";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

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
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(message.text);

	const isUser = message.role === Role.User;
	const messageId = message.id != null ? message.id : "";

	const handleEdit = () => {
		if (editValue === message.text) return setIsEditing(false);
		onEdit(messageId, editValue);
		setIsEditing(false);
	};

	if (isUser) {
		return (
			<div className="flex flex-col items-end gap-1 group">
				{isEditing ? (
					<input
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleEdit()}
						onBlur={handleEdit}
						className="max-w-lg p-3 px-5 rounded-2xl bg-accent text-white border-none outline-none"
						autoFocus
					/>
				) : (
					<div className="max-w-lg p-3 px-5 rounded-2xl wrap-break-words leading-relaxed bg-accent text-white max-h-96 overflow-y-auto">
						{message.text}
					</div>
				)}
				<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
					<button
						onClick={() => setIsEditing(true)}
						className="p-1 hover:bg-blue-300 rounded"
					>
						<Pencil size={14} />
					</button>
					<button
						onClick={() => onDelete(messageId, message.text)}
						className="p-1 hover:bg-red-300 rounded"
					>
						<Trash2 size={14} />
					</button>
				</div>
			</div>
		);
	}

	const characterName = message.character ? message.character.name : "AI";
	const avatarUrl = message.character ? message.character.avatarUrl : "";
	const characterDescription = message.character?.description || "";

	return (
		<div className="flex items-end gap-3 group">
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
				{isEditing ? (
					<input
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleEdit()}
						onBlur={handleEdit}
						className="max-w-lg p-3 px-5 rounded-2xl wrap-break-words leading-relaxed bg-input text-text border border-border overflow-y-auto"
						autoFocus
					/>
				) : (
					<div className="max-w-lg p-3 px-5 rounded-2xl wrap-break-words leading-relaxed bg-input text-text border border-border max-h-96 overflow-y-auto">
						{message.text}
					</div>
				)}
				<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
					<button
						onClick={() => setIsEditing(true)}
						className="p-1 hover:bg-blue-300 rounded"
					>
						<Pencil size={14} />
					</button>
					<button
						onClick={() => onDelete(messageId, message.text)}
						className="p-1 hover:bg-red-300 rounded"
					>
						<Trash2 size={14} />
					</button>
				</div>
			</div>
		</div>
	);
}
