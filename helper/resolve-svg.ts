import { join } from 'node:path';
import {
  cleanupSVG,
  deOptimisePaths,
  importDirectorySync,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools';
import { compareColors, stringToColor } from '@iconify/utils/lib/colors';

export function loadCustomIconSet() {
  // Load icon set
  const iconSet = importDirectorySync(join(import.meta.dirname, '../app/assets/icons'), {
    prefix: 'svg',
  });

  // Parse all icons: optimise, clean up palette
  iconSet.forEachSync((name) => {
    const svg = iconSet.toSVG(name)!;
    cleanupSVG(svg);
    // Change color to `currentColor`
    const blackColor = stringToColor('black')!;
    const whiteColor = stringToColor('white')!;

    parseColors(svg, {
      defaultColor: 'currentColor',
      callback: (attr, colorStr, color) => {
        if (!color) {
          throw new Error(`Invalid color: "${colorStr}" in attribute ${attr}`);
        }
        if (isEmptyColor(color)) {
          // Color is empty: 'none' or 'transparent'. Return as is
          return color;
        }

        // Change black to 'currentColor'
        if (compareColors(color, blackColor)) {
          return 'transparent';
        }

        // Remove shapes with white color
        if (compareColors(color, whiteColor)) {
          return 'transparent';
        }

        if (color.type === 'rgb') {
          return 'transparent';
        }

        throw new Error(`Unexpected color "${colorStr}" in attribute ${attr}`);
      },
    });
    runSVGO(svg);
    deOptimisePaths(svg);
    iconSet.fromSVG(name, svg);
  });

  // Return as function
  return () => iconSet.export();
}
