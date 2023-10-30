import db from '../database/db.js'


const create = async (idUser, token) => {
    return await db.query("INSERT INTO sessions (id_user, token) VALUES (?, ?);", [idUser, token])
}

const remove = async (token) => {
    return await db.query("DELETE FROM sessions WHERE token = ?", [token])
}

export default {create, remove}