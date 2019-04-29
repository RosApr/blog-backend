const baseService = require('../core/base_service');
class PostService extends baseService {
    async queryList({pageSize, current} = {}) {
        const itemsSql = `
            SELECT
             p.id,
             p.title,
             p.date,
             user.nickname,
             p.content,
             p.pv,
             category.name as category FROM post AS p
             left join user on p.owner_id = user.id
             left join category on p.category = category.id ORDER BY p.date DESC LIMIT ${pageSize} OFFSET ${pageSize * (current - 1)};
        `
        const totalSql = `
            SELECT COUNT(*) as total FROM post;
        `
        const items = await this.db.query(itemsSql);
        const total = await this.db.query(totalSql);
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
        const insertPostSql = `
            INSERT INTO post(title, detail, date, owner_id)
             VALUES('${postsData.title}','${postsData.content}',curdate(),'${postsData.id}');
        `
        const res = await this.db.query(insertPostSql)
        return {
            msg: ''
        }
    }
    async queryInfo(postId = '') {
        const queryPostsInfoSql = `
            SELECT post.title, post.pv, post.content, post.date, user.nickname FROM post LEFT JOIN user ON user.id = post.owner_id WHERE post.id = ${postId};
        `
        const res = await this.db.query(queryPostsInfoSql)
        console.log('queryInfo res', res)
        if(res.length > 0) {
            return {
                ...res[0],
                msg: ''
            }
        } else {
            return {
                msg: '该博客不存在'
            }
        }
    }
    async pv(postId = '') {
        const isExistBlogSql = `
            SELECT * FROM post WHERE post.id = '${postId}';
        `
        
        const isExistBlog = await this.db.query(isExistBlogSql)
        console.log('pv', isExistBlog)
        if(isExistBlog.length > 0) {
            let pv = +isExistBlog[0]['pv'] + 1
            let addBlogPvSql = `
                UPDATE post SET pv = ${pv} WHERE id = '${postId}'
            `
            await this.db.query(addBlogPvSql)
            return {
                msg: ''
            }
        } else {
            return {
                msg: 'blog 不存在'
            }
        }
    }
    async del(postId = '') {
        const isExistBlogSql = `
            SELECT * FROM post WHERE id = '${postId}';
        `
        const isExistBlog = await this.db.query(isExistBlogSql)
        console.log('del', isExistBlog)
        if(isExistBlog.length > 0) {
            let delBlogSql = `
                DELETE FROM post WHERE id = '${postId}'
            `
            await this.db.query(delBlogSql)
            return {
                msg: ''
            }
        } else {
            return {
                msg: 'blog 不存在'
            }
        }
    }
}
module.exports = PostService