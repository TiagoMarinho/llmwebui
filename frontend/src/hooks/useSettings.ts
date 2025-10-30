import { useState, useEffect } from "react";

export default function useSettings() {
	const [params, setParams] = useState({ temperature: 0.7 });

	useEffect(() => {
		// TODO: load settings from localStorage or database
	}, []);

	useEffect(() => {
		// TODO: save settings to localStorage or database whenever params change
	}, [params]);

	return { params, setParams };
}
