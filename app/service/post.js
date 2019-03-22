const Service = require('egg').Service
class PostService extends Service {
    async queryPostList({size, page}) {

        const _sql = `
            SELECT * FROM post LIMIT ${size} OFFSET ${size * (page - 1)};
        `
        const post = await this.app.mysql.query(_sql);
        console.log(post)
        return post
    }
}
module.exports = PostService