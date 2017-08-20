module.exports = (db) => {
    db.sync().then(() => {
        console.log('db is synced')
    })
}