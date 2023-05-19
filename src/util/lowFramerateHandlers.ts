export function initVars(
	mouseX: number,
	mouseY: number
): [HTMLDivElement, HTMLDivElement, HTMLDivElement] {
	const desktop = document.getElementById("desktop") as HTMLDivElement;
	const cursor = document.getElementById("cursor") as HTMLDivElement;
	const selection = document.getElementById("selection") as HTMLDivElement;
	return [desktop, cursor, selection];
}

export function updateMouse(
	mouseX: number,
	mouseY: number,
	cursor: HTMLDivElement
) {
	if (mouseX === 0 || mouseY === 0) return;
	cursor.style.left = `${mouseX}px`;
	cursor.style.top = `${mouseY}px`;
}

export function updateSelection(
	mouseX: number,
	mouseY: number,
	dragging: boolean,
	cursor: HTMLDivElement,
	selection: HTMLDivElement
) {
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
}
