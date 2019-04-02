const { Controller } = require('egg')

class BaseController extends Controller {
    get test() {
        return 'test'
    }
}

module.exports = BaseController