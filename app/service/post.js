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
        return {
            ...result,
            msg: ''
        }
    }
    async publishPost(publishData) {
        console.log(publishData)
        const { app } = this
        const insertPostSql = `
            INSERT INTO post(title, detail, date, owner_id) VALUES('${publishData.title}','${publishData.content}',curdate(),'${publishData.id}');
        `
        const res = await app.mysql.query(insertPostSql)
        console.log(res)
        return {
            msg: ''
        }
    }
}
module.exports = PostService