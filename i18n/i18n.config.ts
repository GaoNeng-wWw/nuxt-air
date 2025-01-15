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
          updateAt: '修改时间',
          empty: '暂无数据',
          confirm: '确认',
          cancel: '取消'
        },
        admin:{
          post:{
            edit: '编辑',
            unpin: '取消置顶',
            pin: '置顶',
            del: '删除',
            addCategory: '添加分类',
            unclassified: '未分类',
            sendConfirm:{
              title: '确认要发布吗'
            }
          }
        }
      },
    },
  };
});
