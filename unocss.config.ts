import { defineConfig, presetIcons, presetTypography, presetWind4 } from 'unocss';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { loadCustomIconSet } from './helper/resolve-svg';

const icons = Object.keys(loadCustomIconSet()().icons).map(key => `i-air:${key}`);
export default defineConfig({
  theme: {
    breakpoint: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    animation: {
      durations: {
        'zoom-in': '200ms',
        'zoom-out': '200ms',
        'fast': '200ms',
      },
      timingFns: {
        'zoom-in': 'cubic-bezier(0.35, 0, 0.2, 1)',
        'zoom-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-out': '{from {opacity: 1;} to {opacity: 0}}',
      },
    },
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
    presetWind4({
      preflights: {
        reset: true,
      },
      dark: 'class',
    }),
    presetIcons({
      autoInstall: true,
      collections: {
        air: loadCustomIconSet(),
      },
    }),
    presetTypography(),
    presetScrollbar(),
  ],
  safelist: [...icons, 'bg-green-500', 'bg-green-400', 'bg-green-300'],
  shortcuts: {
    'nav-bg': 'backdrop-blur-xl bg-default-100/20 border border-solid border-default-200 backdrop-blur-20 backdrop-saturate-100',
  },
});
