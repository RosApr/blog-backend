const { Controller } = require('egg')

class BaseController extends Controller {
    get test() {
        return 'test'
    }
    success(status = 200, data = {msg: '', data: {}}) {
        this.ctx.body = data
        this.ctx.status = status
    }
    fail({}) {
        
    }
}

module.exports = BaseController