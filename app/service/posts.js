const baseService = require('../core/base_service');
class PostService extends baseService {
    async queryList({ pageSize, current, isOwn, categoryId='', star } = {}) {
        const { ctx } = this
        const userId = this.ctx.verifyTokenResult['id']
      
        const _itemsql = `
            SELECT
            p.id,
            p.title,
            p.updated_at as date,
            u.nickname,
            p.content,
            p.pv,
            p.star,
            c.name AS category FROM post AS p
            left join user AS u on p.user_id = u.id
            left join category AS c on p.category_id = c.id 
            {{#if star}}
                left join favorite f on p.id = f.post_id
            {{/if}}
            {{#where}}
                {{#if star}}
                    f.user_id='{{userId}}'
                {{/if}}
                {{#if categoryId}}
                    AND p.category_id='{{categoryId}}'
                {{/if}}
                {{#if isOwn}}
                    AND p.user_id='{{userId}}'
                {{/if}}
            {{/where}}
             ORDER BY p.updated_at DESC LIMIT {{pageSize}} OFFSET ${pageSize * (current - 1)}
        `
        const _totalSql = `
        SELECT COUNT(*) AS
        total FROM post p
        {{#if star}}
            left join favorite f on p.id = f.post_id
        {{/if}}
        {{#where}}
            {{#if star}}
                f.user_id='{{userId}}'
            {{/if}}
            {{#if categoryId}}
                AND p.category_id='{{categoryId}}'
            {{/if}}
            {{#if star}}
                AND f.user_id='{{userId}}'
            {{/if}}
            {{#if isOwn}}
                AND p.user_id='{{userId}}'
            {{/if}}
        {{/where}}
        `
        const _isql = ctx.helper.compileTempl(_itemsql, {pageSize, current, isOwn, categoryId, star, userId})
        const _tsql = ctx.helper.compileTempl(_totalSql, {isOwn, categoryId, star, userId})
        console.log('list sql', _isql)
        console.log('list userId', userId)
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
    async create({title, content, id: user_id, categoryId}) {
        // const insertPostSql = `
        //     INSERT INTO post(title, content, user_id, category_id)
        //      VALUES('${postsData.title}', '${postsData.content}', '${postsData.id}', ${postsData.categoryId});
        // `
        await this.db.insert('post', {
            title: title,
            content: content,
            user_id: user_id,
            category_id: categoryId
        })
        return {
            msg: ''
        }
    }
    async modifyInfo({id, title, content}) {
        // const modifyPostSql = `
        //     UPDATE post SET title='${title}', content='${content}', updated_at=now() WHERE id='${id}';
        // `
        await this.db.update('post', {
            id,
            title,
            content,
            updated_at: this.db.literals.now,
        })
        return {
            msg: ''
        }
    }
    async queryInfo(id = '') {
        const queryPostsInfoSql = `
            SELECT p.title,
            p.id,
            p.pv,
            p.content,
            p.updated_at as date,
            p.category_id AS categoryId,
            ${this.ctx.verifyTokenResult.status ? 'IF(f.user_id, 1, 0) AS star,' : ''}
            u.nickname 
            FROM post p LEFT JOIN user u ON u.id = p.user_id 
            ${this.ctx.verifyTokenResult.status ? `LEFT JOIN favorite f on p.id = f.post_id AND f.user_id = '${this.ctx.verifyTokenResult.id}'` : ''} WHERE p.id = ${id} ${this.ctx.verifyTokenResult.status ? 'GROUP BY p.id' : ''};
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
    async pv(id = '') {
        // const isExistBlogSql = `
        //     SELECT * FROM post WHERE post.id = '${id}';
        // `
        
        const isExistBlog = await this.db.get('post', {
            id
        })
        console.log('pv', isExistBlog)
        if(isExistBlog) {
            let pv = +isExistBlog['pv'] + 1
            // let addBlogPvSql = `
            //     UPDATE post SET pv = ${pv} WHERE id = '${id}'
            // `
            await this.db.update('post', {
                id,
                pv
            })
            return {
                msg: ''
            }
        } else {
            return {
                msg: 'blog 不存在'
            }
        }
    }
    async del(id = '') {
        // const isExistBlogSql = `
        //     SELECT * FROM post WHERE id = '${id}';
        // `
        const isExistBlog = await this.db.get('post', {
            id
        })
        console.log('del', isExistBlog)
        if(isExistBlog) {
            // let delBlogSql = `
            //     DELETE FROM post WHERE id = '${id}'
            // `
            await this.db.delete('post', {id})
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