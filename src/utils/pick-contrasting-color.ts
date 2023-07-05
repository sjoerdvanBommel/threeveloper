export function pickContrastingColor(color: string): string {
	const hex = color.replace('#', '');

	// Calculate the brightness of the color
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;

	// Determine the contrasting color based on brightness
	return brightness > 128 ? '#000000' : '#ffffff';
}
