---
date: 2025/01/01
tags:
  - program
---

# Example

本章展示了部分本博客的特殊功能, 目前全站文章支持 `MDX` 与 `Markdown`

## Github 仓库卡片

:::github-repo{repo=GaoNeng-wWw/mirai-ui}
:::

### 源码

```md
:::github-repo{repo=owner/repo}
:::
```

## 链接

[Google](https://www.google.com)

```md
[Google](https://www.google.com)
```

## Card

:::card{type=info title=如何使用}
你可以使用 `:::card{type=info|warn|caution}` 去定义不同的卡片. 同时还可以使用 `title` 参数来指定 title
:::
