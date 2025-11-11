import MessageList from "./MessageList";
import InputBox from "./InputBox";
import { Message } from "../types/message";

interface ChatViewProps {
	messages: Message[];
	onSend: (text: string) => void;
}

export default function ChatView({ messages, onSend }: ChatViewProps) {
	return (
		<div className="flex-1 flex flex-col p-6 m-4 rounded-xl bg-chat">
			<MessageList messages={messages} />
			<InputBox onSend={onSend} />
		</div>
	);
}