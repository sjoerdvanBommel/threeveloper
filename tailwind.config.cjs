const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
				headings: ['Archivo Black', 'Quicksand', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				black: 'rgb(var(--gallery-black) / <alpha-value>)',
				white: 'rgb(var(--gallery-white) / <alpha-value>)',
				bg: {
					primary: 'var(--bg-from)',
					secondary: 'var(--bg-to)'
				},
				title: {
					primary: 'var(--title-from)',
					secondary: 'var(--title-to)'
				}
			},
			gridTemplateColumns: {
				20: 'repeat(20, minmax(0, 1fr))'
			},
			boxShadow: (theme) => ({
				inset: 'inset 0 0 18px -6px #000000',
				'light-bottom': `inset 150px -200px 150px ${theme('colors.white')}`
			})
		},
		transitionDuration: {
			DEFAULT: '300ms'
		}
	},

	plugins: []
};

module.exports = config;
