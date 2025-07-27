import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants';
import { defineConfig, presetIcons, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        reset: true,
      },
    }),
    presetIcons({
      autoInstall: true,
    }),
  ],
  extractors: [extractorArbitraryVariants()],
});
