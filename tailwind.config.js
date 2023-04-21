/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/index.html", "./src/**/*.{js,ts}"],
	theme: {
		extend: {
			backgroundImage: {
				background: "url('/src/assets/img/background.png')",
			},
			fontFamily: {
				poppins: "Poppins, sans-serif",
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
};
