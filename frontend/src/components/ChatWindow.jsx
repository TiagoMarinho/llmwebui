import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

export default function ChatWindow({ messages = [], onSend }) {
	return (
		<div className="chat-window">
			<div className="messages">
				{messages.map((msg, i) => (
					<MessageBubble key={i} message={msg} />
				))}
			</div>
			<InputBox onSend={onSend} />
		</div>
	);
}
