document.documentElement.classList.add('dark');

module.exports = {
  darkMode: 'class', // ESSENCIAL!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // outros caminhos...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}