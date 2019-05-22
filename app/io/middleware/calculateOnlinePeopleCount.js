const room = 'chatRoom'
module.exports = app => {
  return async (ctx, next) => {
    console.log('socket connect establish ok')
    const { socket, app, app: { io } } = ctx
    const nsp = app.io.of('/chat')
    socket.join(room)
    let peopleInRoomInConn = nsp.adapter.rooms[room]
    console.log(peopleInRoomInConn.sockets)
    socket.emit('online', {count: Object.keys(peopleInRoomInConn.sockets).length})
    // nsp.in(room).emit('online', {count: Object.keys(peopleInRoomInConn.sockets).length})
    await next();

    console.log('disconnection!');
    let peopleInRoomInDisconn = nsp.adapter.rooms[room]
    console.log(peopleInRoomInDisconn.sockets)
    nsp.in(room).emit('online', {count: Object.keys(peopleInRoomInDisconn.sockets).length})
  };
};