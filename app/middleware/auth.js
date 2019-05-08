module.exports = options => {
    return async function auth(ctx, next) {
        const currRouteAuth = ctx.currRouteAuth(ctx._matchedRouteName)
        const isUserHasCurrRouteAuth = ctx.isUserHasCurrRouteAuth(currRouteAuth)
        console.log('auth before next', isUserHasCurrRouteAuth)
        if(!isUserHasCurrRouteAuth) {
            ctx.body = {
                msg: '权限不足'
            }
            ctx.status = 401
        }
        await next();
        console.log('auth after next')
        // return 
    }
}