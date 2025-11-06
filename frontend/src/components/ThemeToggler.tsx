import { useTheme } from "../hooks/useTheme";

export default function ThemeToggler() {
	const { theme, toggleTheme } = useTheme();
	return (
		<button
			onClick={toggleTheme}
			className="fixed bottom-4 left-4 w-14 h-14 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg overflow-hidden"
			style={{ backgroundColor: "var(--color-panel)" }}
		>
			<div
				className="absolute inset-0 transition-transform duration-500"
				style={{
					transform:
						theme === "light"
							? "translateY(-100%)"
							: "translateY(0)",
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
	);
}
