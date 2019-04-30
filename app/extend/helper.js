module.exports = {
    formatRequestQueryToNumber(params) {
        const formatParams = {}
        for (let [key, value] of Object.entries(params)) {
            formatParams[key] = Number(value)
        }
        return formatParams
    }
}