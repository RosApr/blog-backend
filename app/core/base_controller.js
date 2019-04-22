const { Controller } = require('egg')

class BaseController extends Controller {
    get test() {
        return 'test'
    }
    success(data = {msg: ''}, status = 200) {
        this.ctx.body = data
        console.log('base controller')
        console.log(this.ctx.body)
        console.log(data)
        this.ctx.status = status
    }
    fail({}) {
        
    }
}

module.exports = BaseController