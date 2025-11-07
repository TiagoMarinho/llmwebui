import { Character } from "../types/character";

type FormData = Omit<Character, "id">;

interface CharacterFormProps {
	formData: FormData;
	onFormChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
	isCreator: boolean;
}

export default function CharacterForm({
	formData,
	onFormChange,
}: CharacterFormProps) {
	const inputBaseClasses = "w-full mt-1 p-2 bg-input border border-border rounded-lg";

	return (
		<div className="flex-1 border border-border mb-4 p-4 bg-[#16161f] rounded-xl overflow-y-auto">
			<label className="block mb-3">
				Name:
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={onFormChange}
					className={inputBaseClasses}
					required
				/>
			</label>
			<label className="block mb-3">
				Avatar URL:
				<input
					type="text"
					name="avatarUrl"
					value={formData.avatarUrl || ""}
					onChange={onFormChange}
					className={inputBaseClasses}
				/>
			</label>
			<label className="block mb-3">
				Description:
				<textarea
					name="description"
					value={formData.description || ""}
					onChange={onFormChange}
					className={`${inputBaseClasses} h-24`}
				/>
			</label>
			<label className="block mb-3">
				System Prompt:
				<textarea
					name="systemPrompt"
					value={formData.systemPrompt || ""}
					onChange={onFormChange}
					className={`${inputBaseClasses} h-48`}
				/>
			</label>
		</div>
	);
}