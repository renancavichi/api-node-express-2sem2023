import db from '../database/db.js'

const getById = async (id) => {
    return await db.query("SELECT name, email FROM users Where id = ?", [id])
}

const create = async (user) => {
    const {name, email, pass} = user
    return await db.query("INSERT INTO users (name, email, pass) VALUES (?, ?, ?);", [name, email, pass])
}

export default {getById, create}