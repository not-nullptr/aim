import { useEffect, useState } from "react";

function Taskbar() {
	const ignoreList = ["start-button", "startMenu"];
	const [pressed, setPressed] = useState(false);
	useEffect(() => {
		document.addEventListener("mousedown", (e) => {
			const target = e.target as HTMLDivElement;
			let shouldStop = false;
			ignoreList.forEach((item) => {
				const el = document.getElementById(item) as HTMLDivElement;
				if (el.contains(target)) {
					shouldStop = true;
					return;
				}
			});
			if (ignoreList.includes(target.id) || shouldStop) return;
			const startButton = document.getElementById(
				"start-button"
			) as HTMLDivElement;
			setPressed(false);
			startButton.classList.remove("start-button-pressed");
		});
	}, []);
	return (
		<div id="taskbar-container">
			<div
				style={{ visibility: pressed ? "visible" : "hidden" }}
				id="startMenu"
			>
				<div id="startMenuItems">
					<div id="startMenuLeftColumn" />
					<div id="startMenuRightColumn" />
				</div>
			</div>
			<div id="taskbar">
				<div
					onMouseDown={(e) => {
						const target = e.target as HTMLDivElement;
						const pressedState = !pressed;
						setPressed(pressedState);
						if (pressedState) {
							target.classList.add("start-button-pressed");
						} else {
							target.classList.remove("start-button-pressed");
						}
					}}
					id="start-button"
				/>
			</div>
		</div>
	);
}

export default Taskbar;
