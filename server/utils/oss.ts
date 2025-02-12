import type { H3Event } from 'h3';
import type { Buffer } from 'node:buffer';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { env } from 'node:process';
import { head, put } from '@vercel/blob';

function vercelAdapter() {
  const getFullPath = (filename: string) => `${env.BLOB_BASE_URL}/${filename}`;
  return {
    put: (name: string, buf: Buffer) => {
      return put(name, buf, { access: 'public' })
        .then(value => value.url);
    },
    has: (filename: string) => {
      return new Promise((resolve) => {
        head(getFullPath(filename))
          .then(() => resolve(true))
          .catch(() => resolve(false));
      });
    },
    getPath: (name: string) => `${env.BLOB_BASE_URL}/${name}`,
  };
}
function localAdapter(event: H3Event) {
  const { OSS_PATH } = useRuntimeConfig(event);
  return {
    async put(name: string, buf: Buffer) {
      writeFileSync(
        join(OSS_PATH, name),
        buf,
      );
      return this.getPath(name);
    },
    async has(name: string) {
      return existsSync(
        join(OSS_PATH, name),
      );
    },
    getPath(name: string) {
      return `/image/${name}`;
    },
  };
}
export function useOSS(event: H3Event) {
  return env.NUXT_DEPLOY_MODE === 'standalone' ? localAdapter(event) : vercelAdapter();
}
