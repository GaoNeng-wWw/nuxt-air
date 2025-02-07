import { Octokit } from '@octokit/core';
import { z } from 'zod';

export const GetPrCardInfo = z.object({
  repo: z.string(),
  owner: z.string(),
  pull_number: z.number({ coerce: true }),
});
export interface PrAuthor {
  name: string;
  avatar: string;
}
export interface PrInfo {
  title: string;
  content: string;
  prNumber: number;
  link: string;
  merged: boolean;
  draft?: boolean;
  locked: boolean;
  state: 'open' | 'closed';
}
function usePrCardNamespace({ owner, repo, pull_number, key }: { owner: string;repo: string;pull_number: number;key: string }) {
  return `GH-PR-CARD::${owner}::${repo}::${pull_number}::${key}`;
}
export default defineApi(async (event) => {
  const { repo, owner, pull_number } = await useQuery(event, GetPrCardInfo);
  const redis = useRedis();
  const infoNamespace = usePrCardNamespace({ owner, repo, pull_number, key: 'info' });
  const authorNamespace = usePrCardNamespace({ owner, repo, pull_number, key: 'author' });
  const prInfo = await redis.getItem<PrInfo>(infoNamespace);
  const prAuthor = await redis.getItem<PrInfo>(authorNamespace);
  const octokit = new Octokit();
  if (prInfo && prAuthor) {
    return {
      info: prInfo,
      author: prAuthor,
    };
  }
  const { PR_CARD_CACHE_TTL_MS } = useRuntimeConfig(event);
  const { info, author } = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls/{pull_number}',
    {
      owner,
      repo,
      pull_number,
    },
  )
    .then((payload) => {
      const {
        data: {
          user,
          title,
          body: content,
          html_url: link,
          state,
          locked,
          merged,
          draft,
        },
      } = payload;
      const info: PrInfo = {
        content: content ?? '',
        title,
        prNumber: pull_number,
        link,
        state,
        locked,
        merged,
        draft,
      };
      const author: PrAuthor = {
        name: user.login,
        avatar: user.avatar_url,
      };
      return { info, author };
    });

  Promise.all([
    redis.setItem(infoNamespace, info, { ttl: PR_CARD_CACHE_TTL_MS }),
    redis.setItem(authorNamespace, author, { ttl: PR_CARD_CACHE_TTL_MS }),
  ])
    .then(() => ({ info, author }))
    .catch(() => {
      return Promise.all([
        redis.removeItem(infoNamespace),
        redis.removeItem(authorNamespace),
      ]);
    })
    .finally(() => {
      return { info, author };
    });
});
