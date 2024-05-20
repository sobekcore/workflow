export default {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@/styles/(.*)$',
    '^@/(.*)$',
  ],
};
