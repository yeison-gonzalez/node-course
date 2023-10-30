const { getUUID } = require('./get-id.plugin')
const { getAge } = require('./get-age.plugin')
const { httpClient } = require('../plugins/http-client.plugin')
const buildLogger = require('./logger.plugin')

module.exports = {
    getUUID,
    getAge,
    httpClient,
    buildLogger,
}