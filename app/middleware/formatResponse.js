module.exports = options => {
    return async function formatResponse(ctx, next) {
        try {
            console.log('format try before next')
            await next()
            console.log('format try after next')
            console.log(ctx.body)
            if(!ctx.body) return ctx.body = {
                msg: ''
            }
            let { body: { msg='', ...data } } = ctx
            if(Object.keys(data).length === 0) {
                data = ''
            }
            ctx.body = {
                msg,
                data
            }
        } catch (err) {
            console.log('format err')
            console.log(err)
            console.log(ctx)
            if(err.status === 422) {
                ctx.status = 400
                ctx.body = {
                    error: err.errors
                }
            }
        }
    }
}