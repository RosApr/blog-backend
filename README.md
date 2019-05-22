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

### socket.io

```js
    //客户端建立socket 链接时候，需要自定义路径则需要在init中配置path，并且与客户端路径一致
    io: {
      init: {
        path: '/chat',
      },
      namespace: {
        // '/': {
        //   connectionMiddleware: [],
        //   packetMiddleware: [],
        // },
        '/chat': {
          connectionMiddleware: ['calculateOnlinePeopleCount', 'auth'],
          packetMiddleware: [],
        }
      },
    },
```

```js
    /* eggjs router配置 of('/chat') 其中/chat为socket命名空间，客户端连接socket时也应该连接对应的命名空间如 io('/chat',[options])，这其中'/chat'即为命名空间
    route('chat', app.io.controller.chat.chat) 其中'chat'为监听对应的socket事件，当socket链接建立后客户端触发该事件，则服务器端会通过
    app.io.controller.chat.chat方法进行处理
     */
    io.of('/chat').route('chat', app.io.controller.chat.chat);
```

```js
 // sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // sending to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');
```