export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'zh',
    messages: {
      zh: {
        menu: {
          post: '文章管理',
        },
        common: {
          notFound: '资源不存在',
        },
      },
    },
  };
});
