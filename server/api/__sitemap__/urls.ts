import type { SitemapUrlInput } from '#sitemap/types';
import { defineSitemapEventHandler } from '#imports';

import prisma from '~/lib/prisma';

export default defineSitemapEventHandler(async () => {
  const posts = await prisma.post.findMany();
  return posts.map<SitemapUrlInput>((post) => {
    return {
      loc: `/posts/${post.id}`,
      _sitemap: 'pages',
    };
  });
});
