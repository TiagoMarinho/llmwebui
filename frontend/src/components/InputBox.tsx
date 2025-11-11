import { useState, useRef, memo } from "react";

export default function InputBox({
	onSend,
}: {
	onSend: (text: string) => void;
}) {
	const [text, setText] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) return;

		onSend(text);
		setText("");

		inputRef.current?.focus();
	};

	return (
		<form className="flex gap-2" onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Type a message..."
				className="flex-1 rounded-xl"
				autoFocus
			/>
			<button type="submit" className="rounded-xl">
				Send
			</button>
		</form>
	);
}