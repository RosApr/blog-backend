const room = 'chatRoom'
module.exports = app => {
    return async (ctx, next) => {
      console.log('packet middle ware')
      const {socket, app, app: { io }} = ctx
      const nsp = io.of('/chat')
      const data = {
        date: Date.now(),
        ...ctx.packet[1],
        nickname: ctx.verifyTokenResult.status ? ctx.verifyTokenResult.nickname : '匿名用户'
      }
      nsp.in(room).emit('chat', data)
      await next();
    };
  };