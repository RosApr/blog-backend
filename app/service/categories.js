const baseService = require('../core/base_service.js')

class CategoryService extends baseService {
    async queryList({current, pageSize} = {}) {
        // const listSql = `
        //     SELECT id, name, updated_at as date from category LIMIT ${pageSize} OFFSET ${(current - 1) * pageSize};
        // `
        // const totalSql = `
        //     SELECT COUNT(*) as total FROM category;
        // `
        const items = await this.db.select('category', {
            columns: ['id', 'name', 'updated_at'],
            order: [['updated_at', 'DESC']],
            limit: pageSize,
            offset: (current - 1) * pageSize
        })
        const total = await this.db.count('category')
        return {
            items: JSON.parse(JSON.stringify(items)),
            total: total,
            msg: ''
        }
    }
    async queryInfo(id = '') {
        // const infoSql = `
        //     SELECT * FROM category WHERE id = '${id}';
        // `
        const res = await this.db.get('category', {
            id
        })
        if(res) {
            return {
                ...res,
                msg: ''
            }
        } else {
            return {
                msg: '分类不存在'
            }
        }
    }
    async create({ name }) {
        // const hasSameNameCategorySql = `
        //     SELECT * FROM category WHERE name='${name}';
        // `
        // const createCategorySql = `
        //     INSERT INTO category(name) VALUES('${name}');
        // `
        const hasSameNameCategory = await this.db.get("category", {
            name
        })
        if(hasSameNameCategory) {
            return {
                msg: '分类名称已存在'
            }
        } else {
            await this.db.insert('category', {
                name
            })
            return {
                msg: ''
            }
        }
    }
    async modifyInfo({id, name}) {
        // const updateCategorySql = `
        //     UPDATE category SET name='${name}', updated_at=now() WHERE id='${id}'
        // `
        const res = await this.db.update('category', {
            id,
            name,
            updated_at: this.db.literals.now,
        })
        console.log('modifyInfo', res)
        return {
            msg: ''
        }
    }
    async del(categoryId = '') {
        // const isExistCategorySql = `
        //     SELECT * FROM category WHERE id = '${categoryId}';
        // `
        const isExistCategory = await this.db.get('category', {id: categoryId})
        console.log('del', isExistCategory)
        if(isExistCategory) {
            // let delCategorySql = `
            //     DELETE FROM category WHERE id = '${categoryId}'
            // `
            await this.db.delete('category', {id: categoryId})
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