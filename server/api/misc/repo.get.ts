import { Octokit } from '@octokit/rest';
import z from 'zod';

export const getRepoInfo = z.object({
  owner: z.string(),
  repo: z.string(),
});
export interface RepoInfo {
  name: string;
  url: string;
  desc: string;
  star: number;
  fork: number;
  license: string | null;
  avatar: string;
}

export default defineCachedEventHandler(async (ctx) => {
  const { owner, repo } = await useQuery(ctx, getRepoInfo);
  const storage = useStorage('default');
  const repoInfo = await storage.get(`REPO/${owner}/${repo}`);
  if (repoInfo) {
    return repoInfo as unknown as RepoInfo;
  }

  const gh = new Octokit();
  return gh.repos.get({
    owner,
    repo,
  })
    .then((handle) => {
      return handle.data;
    })
    .then((repo) => {
      return {
        name: repo.name,
        url: repo.html_url,
        desc: repo.description,
        star: repo.stargazers_count,
        fork: repo.forks,
        license: repo.license?.name,
        avatar: repo.owner.avatar_url,
      };
    })
    .then((info) => {
      return storage.set(`REPO/${owner}/${repo}`, info, { ttl: 300 }).then(() => info);
    })
    .then(info => info);
});
