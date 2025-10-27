import { useState } from "react";

export default function InputBox({ onSend }) {
	const [text, setText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!text.trim()) return;
		onSend(text);
		setText("");
	};

	return (
		<form className="input-box" onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Type a message..."
			/>
			<button type="submit">Send</button>
		</form>
	);
}
