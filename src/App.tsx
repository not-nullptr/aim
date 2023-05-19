import "./XP.css";
import { useEffect, useState } from "react";
import Taskbar from "./components/Taskbar";
import Window from "./components/Window";
import icon from "./assets/img/user/chess.jpg";
import {
	initVars,
	updateMouse,
	updateSelection,
} from "./util/lowFramerateHandlers";

if (
	(window.screenX! > 1900 && window.screenX! < 1940) ||
	(window.screenY! > 1060 && window.screenY! < 2000)
)
	alert(
		"This experience is best viewed on a 1080p monitor. Scaling may be non-pixel-perfect."
	);

function App() {
	const [dragging, shouldDrag] = useState(false);
	const frameRate = 25;
	const [[mouseX, mouseY], setMousePos] = useState([0, 0]);
	useEffect(() => {
		let [mouseX, mouseY] = [0, 0];
		const [desktop, cursor, selection] = initVars(mouseX, mouseY);
		desktop.addEventListener("mousemove", (e) => {
			setMousePos([e.clientX, e.clientY]);
			mouseX = e.clientX;
			mouseY = e.clientY;
		});
		document.addEventListener("mousedown", () => console.log("hello, world"));
		const mouseInterval = setInterval(() => {
			updateMouse(mouseX, mouseY, cursor);
			updateSelection(mouseX, mouseY, dragging, cursor, selection);
		}, (1 / frameRate) * 1000);
		return () => {
			clearInterval(mouseInterval);
		};
	}, [dragging]);
	return (
		<div id="containerContainer">
			<div id="container">
				<div
					id="desktop"
					onMouseDown={(e) => {
						const [snapShottedX, snapShottedY] = [e.clientX, e.clientY];
						const selection = document.getElementById(
							"selection"
						) as HTMLDivElement;
						selection.style.left = `${snapShottedX}px`;
						selection.style.top = `${snapShottedY}px`;
						selection.style.width = `0px`;
						selection.style.height = `0px`;
						selection.style.visibility = "visible";
						shouldDrag(true);
					}}
					onMouseUp={(e) => {
						const selection = document.getElementById(
							"selection"
						) as HTMLDivElement;
						selection.style.visibility = "hidden";
						selection.style.left = `0px`;
						selection.style.top = `0px`;
						selection.style.width = "0px";
						selection.style.height = "0px";
						shouldDrag(false);
					}}
				>
					<div id="cursor" />
					<div id="selection" />
					<Window title="Capital Letter Test" icon={icon}>
						content
					</Window>
					<Taskbar />
				</div>
			</div>
		</div>
	);
}

export default App;
