const { Controller } = require('egg')

class BaseController extends Controller {
    get test() {
        return 'test'
    }
    success(status = 200, data = {msg: ''}) {
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