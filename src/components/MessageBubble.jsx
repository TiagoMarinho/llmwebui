export default function MessageBubble({ message }) {
	const alignClass = message.role === "user" ? "bubble user" : "bubble bot";

	return (
		<div className={alignClass}>
			{message.text}
		</div>
	);
}
  