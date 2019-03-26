module.exports = options => {
    return async function storeAuth(ctx, next) {
        await next();

        const { body, session } = ctx
        if(!body['data']) {
            session.user = null
        } else {
            session.user = body['data']
        }
        return 
    }
}