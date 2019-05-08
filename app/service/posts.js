const baseService = require('../core/base_service');
class PostService extends baseService {
    async queryList({ pageSize, current, isOwn, categoryId='', star } = {}) {
        const { ctx } = this
        const userId = this.ctx.verifyTokenResult['id']
      
        const _itemsql = `
            SELECT
            p.id,
            p.title,
            p.date,
            u.nickname,
            p.content,
            p.pv,
            p.star,
            c.name AS category FROM post AS p
            left join user AS u on p.owner_id = u.id
            left join category AS c on p.category = c.id 
            left join favorite f on p.id = f.post_id
            {{#where}}
                {{#if categoryId}}
                    p.category='{{categoryId}}'
                {{/if}}
                {{#if star}}
                    AND f.user_id='{{userId}}'
                {{/if}}
                {{#if isOwn}}
                    AND p.owner_id='{{userId}}'
                {{/if}}
            {{/where}}
             ORDER BY p.date DESC LIMIT {{pageSize}} OFFSET ${pageSize * (current - 1)}
        `
        const _totalSql = `
        SELECT COUNT(*) AS
        total FROM post p
        {{#if star}}
            left join favorite f on p.id = f.post_id
        {{/if}}
        {{#where}}
            {{#if categoryId}}
                p.category='{{categoryId}}'
            {{/if}}
            {{#if star}}
                AND f.user_id='{{userId}}'
            {{/if}}
            {{#if isOwn}}
                AND p.owner_id='{{userId}}'
            {{/if}}
        {{/where}}
        `
        const _isql = ctx.helper.compileTempl(_itemsql, {pageSize, current, isOwn, categoryId, star, userId})
        const _tsql = ctx.helper.compileTempl(_totalSql, {isOwn, categoryId, star, userId})
        if(isOwn == 1 && !userId) {
            return {
                msg: '需要登录'
            }
        }
        const items = await this.db.query(_isql);
        const total = await this.db.query(_tsql);
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
            INSERT INTO post(title, content, date, owner_id, category)
             VALUES('${postsData.title}', '${postsData.content}', now(), '${postsData.id}', ${postsData.categoryId});
        `
        await this.db.query(insertPostSql)
        return {
            msg: ''
        }
    }
    async modifyInfo({id, title, content}) {
        const modifyPostSql = `
            UPDATE post SET title='${title}', content='${content}', date=now() WHERE id='${id}';
        `
        await this.db.query(modifyPostSql)
        return {
            msg: ''
        }
    }
    async queryInfo(postId = '') {
        const queryPostsInfoSql = `
            SELECT p.title,
            p.id,
            p.pv,
            p.content,
            p.date,
            p.category AS categoryId,
            ${this.ctx.verifyTokenResult.status ? 'IF(f.user_id, 1, 0) AS star,' : ''}
            u.nickname 
            FROM post p LEFT JOIN user u ON u.id = p.owner_id 
            ${this.ctx.verifyTokenResult.status ? `LEFT JOIN favorite f on p.id = f.post_id AND f.user_id = '${this.ctx.verifyTokenResult.id}'` : ''} WHERE p.id = ${postId} ${this.ctx.verifyTokenResult.status ? 'GROUP BY p.id' : ''};
        `
        console.log('this.ctx.verifyTokenResult.status', this.ctx.verifyTokenResult.status)
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