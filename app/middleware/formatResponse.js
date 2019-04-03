module.exports = options => {
    return async function formatResponse(ctx, next) {
        try {
            await next()
            let { body: { msg, ...data } } = ctx
            if(Object.keys(data).length === 0) {
                data = ''
            }
            ctx.body = {
                msg,
                data
            }
        } catch (err) {
            if(err.status === 422) {
                ctx.status = 400
                ctx.body = {
                    error: err.errors
                }
            }
        }
    }
}