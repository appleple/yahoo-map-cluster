export const append = (element: HTMLElement,　string: string) => {
	const div = document.createElement('div');
	div.innerHTML = string;
	while (div.children.length > 0) {
		element.appendChild(div.children[0]);
	}
}