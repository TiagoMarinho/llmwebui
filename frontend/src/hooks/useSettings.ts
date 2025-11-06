import { useState, useEffect } from "react";

export interface Settings {
	temperature: number;
}

export default function useSettings() {
	const [params, setParams] = useState({} as Settings);

	const loadSettings = async () => {
		try {
			const res = await fetch("/api/v1/user/settings");
			const data = await res.json();
			setParams(data.settings);
			console.log("Loaded settings:", data.settings);
		} catch (err) {
			console.error(err);
		}
	};

	const saveSettings = async (newSettings: Settings) => {
		try {
			console.log("Saving settings:", newSettings);
			await fetch("/api/v1/user/settings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ settings: newSettings }),
			});
			setParams(newSettings);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadSettings();
	}, []);

	return { params, setParams, saveSettings };
}
