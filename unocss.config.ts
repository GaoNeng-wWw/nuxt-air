import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants';
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWind4 } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      foreground: 'var(--foreground)',
      background: 'var(--background)',
      primary: {
        50: 'var(--primary-50)',
        100: 'var(--primary-100)',
        200: 'var(--primary-200)',
        300: 'var(--primary-300)',
        400: 'var(--primary-400)',
        500: 'var(--primary-500)',
        600: 'var(--primary-600)',
        700: 'var(--primary-700)',
        800: 'var(--primary-800)',
        900: 'var(--primary-900)',
        950: 'var(--primary-950)',
      },
      default: {
        50: 'var(--default-50)',
        100: 'var(--default-100)',
        200: 'var(--default-200)',
        300: 'var(--default-300)',
        400: 'var(--default-400)',
        500: 'var(--default-500)',
        600: 'var(--default-600)',
        700: 'var(--default-700)',
        800: 'var(--default-800)',
        900: 'var(--default-900)',
        950: 'var(--default-950)',
      },

    },
  },
  presets: [
    presetAttributify(),
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      autoInstall: true,
    }),
    presetTypography(),
  ],
  extractors: [extractorArbitraryVariants()],
});
