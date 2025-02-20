import type { SitemapUrlInput } from '#sitemap/types';
import { defineSitemapEventHandler } from '#imports';

import prisma from '~/lib/prisma';

export default defineSitemapEventHandler(async () => {
  const posts = await prisma.post.findMany();
  const categories = await prisma.category.findMany();
  const postUrls = posts.map<SitemapUrlInput>((post) => {
    return {
      loc: `/posts/${post.id}`,
      _sitemap: 'pages',
    };
  });
  const categoryUrls = categories.map((category) => {
    return {
      loc: `/category?id=${category.id}`,
      _sitemap: 'pages',
    };
  });
  return [
    ...categoryUrls,
    ...postUrls,
  ];
});
