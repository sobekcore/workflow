import plugin from 'tailwindcss/plugin';

export default {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin((plugin) => {
      plugin.addVariant('hocus', ['&:hover', '&:focus-visible']);
    }),
  ],
};
