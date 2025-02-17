import { z } from 'zod';

export const BooleanStringZod = z.preprocess((val) => {
  if (typeof val !== 'string') {
    return false;
  }
  return val.toLowerCase() === 'true';
}, z.boolean()).default(true) as z.ZodDefault<z.ZodEffects<z.ZodBoolean, boolean, boolean>>;
