const db = require('./dbConfig')

const get = () => {
    return db.table('users')
}

const getUserByUsername = (username) => {
    return db.table('users')
        .where('username', username)
        .first()
}

const register = async (data) => {
    let [id] = await db.table('users').insert(data)
    return id
}

module.exports = {
    get,
    getUserByUsername,
    register
}
