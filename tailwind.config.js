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
			gridTemplateColumns: {
				"auto-fit-100": "repeat(auto-fit, minmax(128px, 1fr))",
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
	},
	plugins: [],
};
