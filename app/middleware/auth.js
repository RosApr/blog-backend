const { path: apiPath } = require('../config')

module.exports = options => {
    return async function auth(ctx, next) {
        await next();

        const { body, request: { url } } = ctx
        if(body.msg != '') {
            return
        }
        if(url === `${apiPath}/logout`) {
            ctx.delToken()
        } else {
            ctx.createToken(body.data)
        }
        return 
    }
}