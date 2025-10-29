import { ROLE } from "../../../shared/role";

export default function MessageBubble({ message }) {
  const bubbleStyle =
    message.role === ROLE.USER
      ? { backgroundColor: "#6b4cff" }
      : {
          backgroundColor: "var(--color-input)",
          borderColor: "var(--color-accent)",
          border: "1px solid",
        };

  const bubbleClass =
    message.role === ROLE.USER
      ? "text-white self-end"
      : "text-[#e0e0f0] self-start";

  return (
    <div
      className={`max-w-[65%] p-3 px-5 rounded-2xl wrap-break-words leading-relaxed ${bubbleClass}`}
      style={bubbleStyle}
    >
      {message.text}
    </div>
  );
}
