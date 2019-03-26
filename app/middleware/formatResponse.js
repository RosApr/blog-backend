module.exports = options => {
    return async function formatResponse(ctx, next) {
        await next()

        let { body: { msg, ...data } } = ctx
        if(Object.keys(data).length === 0) {
            data = ''
        }
        if(msg != '') {
            ctx.status = 401
        } else {
            ctx.body = {
                data,
                msg
            }
        }
        return
    }
}