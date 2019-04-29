const baseService = require('../core/base_service.js')

class CategoryService extends baseService {
    async queryList({current, pageSize} = {}) {
        const listSql = `
            SELECT id, name, date from category LIMIT ${pageSize} OFFSET ${(current - 1) * pageSize};
        `
        const totalSql = `
            SELECT COUNT(*) as total FROM category;
        `
        const items = await this.db.query(listSql)
        const total = await this.db.query(totalSql)
        return {
            items: JSON.parse(JSON.stringify(items)),
            total: total[0]['total'],
            msg: ''
        }
    }
    async queryInfo(id = '') {
        const infoSql = `
            SELECT * FROM category WHERE id = '${id}';
        `
        const res = await this.db.query(infoSql)
        if(res.length > 0) {
            return {
                ...res[0],
                msg: ''
            }
        } else {
            return {
                msg: '分类不存在'
            }
        }
    }
    async create({ name }) {
        const hasSameNameCategorySql = `
            SELECT * FROM category WHERE name='${name}';
        `
        const createCategorySql = `
            INSERT INTO category(name, date) VALUES('${name}', now());
        `
        const hasSameNameCategory = await this.db.query(hasSameNameCategorySql)
        if(hasSameNameCategory.length > 0) {
            return {
                msg: '分类名称已存在'
            }
        } else {
            await this.db.query(createCategorySql)
            return {
                msg: ''
            }
        }
    }
    async modifyInfo({id, name}) {
        const updateCategorySql = `
            UPDATE category SET name='${name}', date=now() WHERE id='${id}'
        `
        const res = await this.db.query(updateCategorySql)
        console.log('modifyInfo', res)
        return {
            msg: ''
        }
    }
    async del(categoryId = '') {
        const isExistCategorySql = `
            SELECT * FROM category WHERE id = '${categoryId}';
        `
        const isExistCategory = await this.db.query(isExistCategorySql)
        console.log('del', isExistCategory)
        if(isExistCategory.length > 0) {
            let delCategorySql = `
                DELETE FROM category WHERE id = '${categoryId}'
            `
            await this.db.query(delCategorySql)
            return {
                msg: ''
            }
        } else {
            return {
                msg: 'Category 不存在'
            }
        }
    }
}

module.exports = CategoryService