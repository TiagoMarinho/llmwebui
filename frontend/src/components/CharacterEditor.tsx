import { VIEW } from "../shared/view";

export default function CharacterEditor({
	selectedCharacter,
	setView,
	saveCharacter,
}: {
	selectedCharacter: string;
	setView: (view: VIEW) => void;
	saveCharacter: (data: any) => void;
}) {
	return (
		<div className="flex-1 p-6 flex flex-col rounded-xl">
			<h1>Editing: {selectedCharacter}</h1>

			{/* Example character info */}
			<div className="flex-1 border border-border mb-4 p-4 bg-[#16161f] rounded-xl">
				<p>Picture, stats, description, etc.</p>
			</div>

			<button
				onClick={() => setView(VIEW.CHAT)}
				className="px-5 py-2.5 rounded-xl bg-accent text-bg border-none cursor-pointer 
						font-medium transition-all duration-250 hover:bg-[#c299ff] hover:-translate-y-px"
			>
				← Back to Chat
			</button>
		</div>
	);
}
