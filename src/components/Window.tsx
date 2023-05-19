import { useEffect } from "react";

interface IWindowBorderProps {
	icon?: string;
	title: string;
	children?: React.ReactNode;
}

function mouseMove(e: MouseEvent) {
	const cursor = document.getElementById("cursor") as HTMLDivElement;
	const [offsetX, offsetY] = [
		cursor.style.left.replace("px", "") || 0,
		cursor.style.top.replace("px", "") || 0,
	];
	const window = (e.target as HTMLElement).parentElement as HTMLDivElement;
	if (!window.classList.contains("windowBorder")) return;
	const [currentTop, currentLeft] = [
		parseInt(window.style.top.replace("px", "")) || 0,
		parseInt(window.style.left.replace("px", "")) || 0,
	];
	window.style.top = `${offsetY}px`;
	window.style.left = `${offsetX}px`;
}

export default function Window(props: IWindowBorderProps) {
	useEffect(() => {
		document.addEventListener("mouseup", (e) => {
			document.removeEventListener("mousemove", mouseMove);
		});
	}, []);
	return (
		<div className="windowBorder">
			<div
				onMouseDown={(e) => {
					document.addEventListener("mousemove", mouseMove);
				}}
				className="titleBar"
			>
				{props.icon ? <img className="titleBarIcon" src={props.icon} /> : null}
				<div className="titleBarText">{props.title}</div>
			</div>
			<div className="windowContent">{props.children}</div>
		</div>
	);
}
