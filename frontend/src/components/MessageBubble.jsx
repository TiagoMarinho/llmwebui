import { ROLE } from "../../../shared/role";

export default function MessageBubble({ message }) {
	const alignClass = message.role === ROLE.USER ? "bubble user" : "bubble bot";

	return (
		<div className={alignClass}>
			{message.text}
		</div>
	);
}
  