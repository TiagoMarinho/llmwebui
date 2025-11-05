import { useTheme } from "../hooks/useTheme";

export default function Sidebar({ history = [] }) {
	const { theme, toggleTheme } = useTheme();
	return (
		<div
			className="w-[20%] max-w-[280px] shrink-0 p-6 overflow-y-auto"
			style={{
				backgroundColor: "var(--color-panel)",
				borderRight: "1px solid var(--color-border)",
			}}
		>
			<button
				onClick={toggleTheme}
				className="relative w-14 h-14 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg overflow-hidden"
				style={{ backgroundColor: 'var(--color-panel)' }}
			>
				<div
					className="absolute inset-0 transition-transform duration-500"
					style={{
						transform: theme === 'light' ? 'translateY(-100%)' : 'translateY(0)'
					}}
				>
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="text-2xl">🌙</span>
					</div>
					<div className="absolute inset-0 flex items-center justify-center translate-y-full">
						<span className="text-2xl">☀️</span>
					</div>
				</div>
			</button>

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
