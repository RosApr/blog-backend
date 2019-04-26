const Service = require('egg').Service
class PostService extends Service {
    async queryList({pageSize, current} = {}) {
        const { app } = this
        const itemsSql = `
            SELECT
             p.id,
             p.title,
             p.date,
             user.nickname,
             p.content,
             p.pv,
             category.name FROM post AS p
             left join user on p.owner_id = user.id
             left join category on p.category = category.id ORDER BY p.date DESC LIMIT ${pageSize} OFFSET ${pageSize * (current - 1)};
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
    async create(postsData) {
        const { app } = this
        const insertPostSql = `
            INSERT INTO post(title, detail, date, owner_id)
             VALUES('${postsData.title}','${postsData.content}',curdate(),'${postsData.id}');
        `
        const res = await app.mysql.query(insertPostSql)
        return {
            msg: ''
        }
    }
    async queryInfo(postId = '') {
        const { app } = this
        const queryPostsInfoSql = `
            SELECT post.title, post.detail, post.date, user.name FROM post LEFT JOIN user ON user.id = post.owner_id WHERE post.id = ${postId};
        `
        //SELECT title, detail, date, (SELECT name FROM user WHERE post.id = ${postId}) as name from post WHERE post.id = ${ postId};
        const res = await app.mysql.query(queryPostsInfoSql)
        return {
            ...res[0],
            msg: ''
        }
    }
}
module.exports = PostService