import { useEffect, useState } from "react";

export function useTheme() {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? savedTheme : "dark";
	});

	useEffect(() => {
		if (theme === "light") {
			document.documentElement.classList.add("light");
		} else {
			document.documentElement.classList.remove("light");
		}
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) =>
			prevTheme === "light" ? "dark" : "light",
		);
	};

	return { theme, toggleTheme, setTheme: setTheme };
}
