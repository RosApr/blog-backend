const Service = require('egg').Service
class PostService extends Service {
    async queryPostList({size, page}) {
        const { app } = this
        const itemsSql = `
            SELECT * FROM post LIMIT ${size} OFFSET ${size * (page - 1)};
        `
        const totalSql = `
            SELECT COUNT(*) as total FROM post;
        `
        const items = await app.mysql.query(itemsSql);
        const total = await app.mysql.query(totalSql);
        const result = {
            items: JSON.parse(JSON.stringify(items)),
            total: total[0].total
        }
        return result
    }
    async publishPost() {}
}
module.exports = PostService