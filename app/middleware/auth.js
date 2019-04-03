module.exports = options => {
    return async function auth(ctx, next) {
        console.log('auth')
        await next();

        const { body, request: { url }, app: { config: { apiPath }} } = ctx
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