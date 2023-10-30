import db from '../database/db.js'

const getById = async (id) => {
    return await db.query("SELECT name, email, photo FROM users Where id = ?", [id])
}

const getByEmail = async (email) => {
    return await db.query("SELECT * FROM users Where email = ?;", [email])
}

const getAll = async () => {
    return await db.query("SELECT id, name, email, photo FROM users")
}

const create = async (user) => {
    const {name, email, pass, photo} = user
    return await db.query("INSERT INTO users (name, email, pass, photo) VALUES (?, ?, ?, ?);", [name, email, pass, photo])
}

const update = async (user) => {
    const {id, name, email, photo} = user
    return await db.query("UPDATE users SET name = ?, email = ?, photo = ? WHERE id = ?;", [name, email, photo, id])
}

const remove = async (id) => {
    return await db.query("DELETE FROM users WHERE id = ?", [id])
}

export default {getById, getByEmail, create, update, remove, getAll}