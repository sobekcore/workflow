import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

function palette(name: string) {
  return {
    50: `var(--colors-${name}-50)`,
    100: `var(--colors-${name}-100)`,
    200: `var(--colors-${name}-200)`,
    300: `var(--colors-${name}-300)`,
    400: `var(--colors-${name}-400)`,
    500: `var(--colors-${name}-500)`,
    600: `var(--colors-${name}-600)`,
    700: `var(--colors-${name}-700)`,
    800: `var(--colors-${name}-800)`,
    900: `var(--colors-${name}-900)`,
    950: `var(--colors-${name}-950)`,
  };
}

export default {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      indigo: colors.indigo,
      emerald: colors.emerald,
      rose: colors.rose,

      background: 'var(--colors-background)',
      default: palette('default'),
      brand: palette('brand'),
      success: palette('success'),
      error: palette('error'),
    },
  },
  plugins: [
    plugin((plugin) => {
      plugin.addVariant('hocus', ['&:hover', '&:focus-visible']);
    }),
  ],
};
