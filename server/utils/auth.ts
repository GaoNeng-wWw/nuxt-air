import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin as rolePlugin } from 'better-auth/plugins';
import { ac, admin, user } from './auth/permission';
import { env } from 'node:process';

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
  socialProviders: {
    github: {
      clientId: env.GH_CLIENT_ID ?? '',
      clientSecret: env.GH_CLIENT_SECRET ?? '',
    },
  },
});
