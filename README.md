# blog



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org

### mysql 设计

user

| id | account | pwd | nickname | role | star |
| :-: | :-: | :-: | :-: | :-: | :-: |
| 用户ID | 账号 | 密码 | 昵称 | 权限 |

category

| id | name |
| :-: | :-: |
| 分类ID | 名称 |

favorite

| post_id | user_id |
| :-: | :-: |
| 文章ID | 用户ID |

post

| id | title | date | owner_id  | pv | category | content |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 文章ID | 标题 | 操作时间 | 所属用户 | 类目 | 内容 |

comment

| id | owner_id | post_id | date | parent_id | content |
| :-: | :-: | :-: | :-: | :-: | :-: |
| 评论ID | 所属用户 | 文章ID | 操作时间 | 所属父级id | 内容 |

用户权限分为 普通用户 | 管理员

管理员能做的事情

- 登录         -no auth
- 修改用户信息
- 操作文章分类
- 获取类目列表  -no auth
- 获取文章列表  -no auth
- 查看文章详情  -no auth
- 查看所有用户信息（除密码）
- 修改 删除文章
- 删除用户
- 重置用户密码

普通用户能做的事情

- 登录         -no auth
- 注册         -no auth
- 修改用户信息
- 发布文章
- 获取文章列表  -no auth
- 查看文章详情  -no auth
- 获取类目列表  -no auth
- 修改文章
- 删除文章
- 收藏文章
- ~~评论~~

未登录用户能做的事情

- 登录         -no auth
- 注册         -no auth
- 获取文章列表  -no auth
- 查看文章详情  -no auth
- 获取类目列表  -no auth

需要权限验证的接口

不需要权限验证的接口

### egg

中间件执行顺序： global middleware -> router mapping -> router middleware -> controller