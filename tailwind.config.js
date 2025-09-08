document.documentElement.classList.add('dark');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // outros caminhos...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default Header;