import { useRef, useLayoutEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "../types/message";

export default function MessageList({ messages = [] }: { messages: Message[] }) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const wasAtBottomRef = useRef(true);

	useLayoutEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		if (wasAtBottomRef.current) {
			container.scrollTop = container.scrollHeight;
		}
	}, [messages]);

	const handleScroll = () => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const scrollThreshold = 10;
		const isAtBottom =
			container.scrollHeight - container.clientHeight <=
			container.scrollTop + scrollThreshold;
			
		wasAtBottomRef.current = isAtBottom;
	};

	return (
		<div
			ref={scrollContainerRef}
			onScroll={handleScroll}
			className="flex-1 overflow-y-auto flex flex-col gap-2.5 mb-4 p-1"
		>
			{messages.map((msg, i) => (
				<MessageBubble key={msg.id || i} message={msg} />
			))}
		</div>
	);
}