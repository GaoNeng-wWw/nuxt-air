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
          createAt: '创建时间',
          updateAt: '修改时间'
        },
      },
    },
  };
});
