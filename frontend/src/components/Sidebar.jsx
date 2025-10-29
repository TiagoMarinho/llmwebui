export default function Sidebar({ history = [] }) {
  return (
    <div
      className="w-[20%] max-w-[280px] shrink-0 p-6 overflow-y-auto"
      style={{
        backgroundColor: "var(--color-panel)",
        borderRight: "1px solid var(--color-border)",
      }}
    >
      <h2>History</h2>
      {history.length > 0 ? (
        history.map((item, i) => (
          <div
            key={i}
            className="p-2 px-3 border-b border-border rounded-lg mb-1 cursor-pointer 
								transition-colors duration-200 hover:bg-accent/10"
          >
            {item}
          </div>
        ))
      ) : (
        <div className="text-gray-500 italic">No chats yet</div>
      )}
    </div>
  );
}
