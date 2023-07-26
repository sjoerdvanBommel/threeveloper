const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		fontFamily: {
			paragraph: ['Quicksand', ...defaultTheme.fontFamily.sans],
			headings: ['Lato', 'Quicksand', ...defaultTheme.fontFamily.sans]
		}
	},

	plugins: []
};

module.exports = config;
