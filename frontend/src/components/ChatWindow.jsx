import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";

export default function ChatWindow({ messages = [], onSend }) {
  return (
    <div
      className="flex-1 flex flex-col p-6 rounded-xl m-4"
      style={{ backgroundColor: "var(--color-chat)" }}
    >
      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 mb-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>
      <InputBox onSend={onSend} />
    </div>
  );
}
