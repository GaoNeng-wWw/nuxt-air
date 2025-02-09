import antfu from '@antfu/eslint-config';
import stylistic from '@stylistic/eslint-plugin';
import tailwind from 'eslint-plugin-tailwindcss';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu({
    javascript: {
      overrides: {
        'curly': 'off',
        '@stylistic/brace-style': ['warn', '1tbs'],
      },
    },
    vue: {
      overrides: {
        'vue/component-name-in-template-casing': ['warn', 'kebab-case'],
      },
    },
    stylistic: {
      semi: true,
    },
  }),
  {
    name: 'tailwindcss/rules',
    plugins: {
      tailwindcss: tailwind,
    },
    rules: {
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-contradicting-classname': 'error',
      'tailwindcss/enforces-shorthand': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'off',
    },
  },
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'curly': 'off',
      '@stylistic/brace-style': ['warn', '1tbs'],
    },
  },
);
