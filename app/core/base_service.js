const { Service } = require('egg')

class BaseService extends Service {
    get db() {
        return this.app.mysql
    }
}

module.exports = BaseService