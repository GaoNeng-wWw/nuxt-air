import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants';
import { defineConfig, presetAttributify, presetIcons, presetTypography, presetWind4 } from 'unocss';

export default defineConfig({
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
