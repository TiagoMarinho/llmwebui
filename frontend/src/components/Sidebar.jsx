export default function Sidebar({ history = [] }) {
	return (
		<div className="sidebar">
			<h2>History</h2>
			{history.length > 0 ? (
				history.map((item, i) => <div key={i} className="history-item">{item}</div>)
			) : (
				<div className="history-empty">No chats yet</div>
			)}
		</div>
	);
}
  