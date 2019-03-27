
module.exports = options => {
    return async function storeAuth(ctx, next) {
        await next();

        const { body, request: { url } } = ctx
        if(body.msg != '') {
            return
        }
        if(url === '/api/logout') {
            ctx.helper.delToken()
        } else {
            ctx.helper.createToken(body.data)
        }
        return 
    }
}