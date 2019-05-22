const Controller = require('egg').Controller;

class Chat extends Controller {
    // index() {
    //     const message = this.ctx.args[0]
    //     console.log('index-----------------backend receive client socket io request-----------------')
    //     this.ctx.socket.emit('res', 'hello from server index Controller');
    // }
    chat() {
        const { ctx, app, service, config } = this
        const message = ctx.args[0]
        console.log(message)
        console.log('chat-----------------backend receive client socket io request-----------------')
        // ctx.socket.emit('chat', 'hello from server chat Controller');
    }
    online() {
        const { ctx, app, service, config } = this
        const message = ctx.args[0]
        console.log(message)
        console.log('chat-----------------backend receive client socket io request-----------------')
        ctx.socket.emit('online', {type: 'online'});
    }
}

module.exports = Chat