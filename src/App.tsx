import "./XP.css";
import startNeutral from "./assets/img/start-neutral.png";
import startHover from "./assets/img/start-hover.png";
import { useEffect, useState } from "react";
import Taskbar from "./components/Taskbar";

if (
	(window.screenX! > 1900 && window.screenX! < 1940) ||
	(window.screenY! > 1060 && window.screenY! < 2000)
)
	alert(
		"This experience is best viewed on a 1080p monitor. Scaling may be non-pixel-perfect."
	);

function App() {
	const [mouseInside, setMouseInside] = useState(false);
	const [dragging, shouldDrag] = useState(false);
	const frameRate = 30;
	useEffect(() => {
		let [mouseX, mouseY] = [0, 0];
		const desktop = document.getElementById("desktop") as HTMLDivElement;
		const cursor = document.getElementById("cursor") as HTMLDivElement;
		const selection = document.getElementById("selection") as HTMLDivElement;
		desktop.addEventListener("mouseenter", () => setMouseInside(true));
		desktop.addEventListener("mouseleave", () => setMouseInside(false));
		desktop.addEventListener("mousemove", (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		});
		const mouseInterval = setInterval(() => {
			if (dragging) {
				const shouldEvenBother =
					cursor.style.left !== selection.style.left &&
					cursor.style.top !== selection.style.top;
				selection.style.width = shouldEvenBother
					? `${(parseInt(selection.style.left.replace("px", "")) - mouseX)
							.toString()
							.replace("-", "")}px`
					: "0px";
				selection.style.height = shouldEvenBother
					? `${(parseInt(selection.style.top.replace("px", "")) - mouseY)
							.toString()
							.replace("-", "")}px`
					: "0px";
				let transformX = 1;
				let transformY = 1;
				if (-(parseInt(selection.style.top.replace("px", "")) - mouseY) < 0) {
					transformY = -1;
				}
				if (-(parseInt(selection.style.left.replace("px", "")) - mouseX) < 0) {
					transformX = -1;
				}
				selection.style.transform = shouldEvenBother
					? `scale(${transformX}, ${transformY})`
					: "scale(1)";
			} else {
				selection.style.visibility = "hidden";
				selection.style.left = `0px`;
				selection.style.top = `0px`;
				selection.style.width = "0px";
				selection.style.height = "0px";
			}
			if (mouseX === 0 || mouseY === 0) return;
			cursor.style.left = `${mouseX}px`;
			cursor.style.top = `${mouseY}px`;
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
					<Taskbar />
				</div>
			</div>
		</div>
	);
}

export default App;
