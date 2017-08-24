const Config = require('../config')

module.exports = (db) => {
    const options = Config.development ? {force: true} : null
    db.drop().then(() => {
        console.log('dropping db')
    })
    db.sync(options).then(() => {
        console.log('db synced')
    })
}