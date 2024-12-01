import resolveConfig from 'tailwindcss/resolveConfig';
import config from '~/tailwind.config.ts';

export const tailwindConfig = resolveConfig(config).theme;
