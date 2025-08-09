// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin as rolePlugin } from 'better-auth/plugins';
import { ac, admin, user } from './auth/permission';

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  plugins: [
    rolePlugin({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});
