import type { H3Event } from 'h3';
import type { Buffer } from 'node:buffer';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export function useOSS(event: H3Event) {
  const { OSS_PATH } = useRuntimeConfig(event);
  return {
    put(name: string, buf: Buffer) {
      return writeFileSync(
        join(OSS_PATH, name),
        buf,
      );
    },
    has(name: string) {
      return existsSync(
        join(OSS_PATH, name),
      );
    },
  };
}
