import { useState } from "react";

export default function InputBox({
	onSend,
}: {
	onSend: (text: string) => void;
}) {
	const [text, setText] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) return;
		onSend(text);
		setText("");
	};

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Type a message..."
				className="flex-1 rounded-xl"
			/>
			<button type="submit" className="rounded-xl">
				Send
			</button>
		</form>
	);
}
