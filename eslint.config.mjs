import withNuxt from './.nuxt/eslint.config.mjs';
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt({
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    'curly': 'off',
    '@stylistic/brace-style': ['warn', '1tbs'],
    'vue/multi-word-component-names': ['off']
  },
});
