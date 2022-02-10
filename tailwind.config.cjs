module.exports = {
  // add this section
  purge: ['./src/**/*.html', './src/**/*.svelte'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        90: '90vh',
        60: '60vh',
        40: '40vh'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
