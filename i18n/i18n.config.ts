import zodErrors from './zod/zhCN.json';

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'zh',
    messages: {
      en:{
        breadcrumb:{
          items:{
            admin:{
              index:{
                label: 'Dashboard'
              },
              post:{
                label: 'Post Manage'
              },
            }
          }
        }
      },
      zh: {
        ...zodErrors,
        navbar:{
          index: '首页',
          post: '文章'
        },
        breadcrumb: {
          items:{
            index:{
              label: '首页'
            },
            admin:{
              label: '仪表盘'
            },
            'admin::post': {
              label: '文章管理'
            },
            'admin::post::edit': {
              label: '文章编辑'
            },
            'admin::category': {
              label: '分类管理'
            }
          }
        },
        menu: {
          post: '文章管理',
          categories: '分组管理'
        },
        common: {
          notFound: '资源不存在',
          createAt: '创建时间',
          updateAt: '修改时间',
          empty: '暂无数据',
          confirm: '确认',
          cancel: '取消',
          unauth: '未登录',
          auth_expire: '登陆过期',
          bad_token: 'token 不合法',
          userNotFound: '用户不存在',
          unknownError: '未知错误',
          permissionDenied: '权限不足'
        },
        admin:{
          category: {
            deleteConfirm: '确定要删除吗?',
            update:{
              success: '修改成功'
            },
            new:{
              btn: '新建',
              nameInputLabel: '分类名',
              success: '添加成功'
            }
          },
          post:{
            edit: '编辑',
            unpin: '取消置顶',
            pin: '置顶',
            del: '删除',
            addCategory: '添加分类',
            unclassified: '未分类',
            sendConfirm:{
              title: '确认要发布吗'
            },
            newButton: '写一篇新文章',
            notMoreData: '到底了~'
          }
        }
      },
    },
  };
});
