module.exports = options => {
    return async function auth(ctx, next) {
        const currRouteAuth = ctx.currRouteAuth(ctx._matchedRouteName)
        const isUserHasCurrRouteAuth = ctx.isUserHasCurrRouteAuth(currRouteAuth)
        if(!isUserHasCurrRouteAuth) {
            ctx.body = {
                msg: ''
            }
            ctx.status = 401
        }
        await next();
        return 
    }
}