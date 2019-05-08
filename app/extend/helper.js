const handlebars = require('handlebars')

handlebars.registerHelper("where", function(opt){
    var content = opt.fn(this);
    if(content.trim().length == 0){
        return "";
    } else if(content.trim().length > 0 &&  content.trimLeft().indexOf("AND") === 0){
        return "where " + content.trimLeft().slice(3);
    }
    return "where " + content.trimLeft();
});

module.exports = {
    formatRequestQueryToNumber(params) {
        const formatParams = {}
        for (let [key, value] of Object.entries(params)) {
            formatParams[key] = Number(value)
        }
        return formatParams
    },
    compileTempl(templ, data) {
        const template = handlebars.compile(templ)
        return template(data)
    }
}