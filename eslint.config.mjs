import antfu from '@antfu/eslint-config';
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  antfu({
    stylistic: {
      semi: true,
      overrides: {
        'style/brace-style': ['warn', '1tbs'],
      },
    }
  }),
);
