import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from '../config.js'

const auth = (req, res, next) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                error: `Usuário Deslogado! Efetue o login!`
            })
        }
        const userToken = jwt.verify(token, TOKEN_SECRET)
        req.userLogged = userToken
        next()
    } catch (error){
        console.log(error)
        return res.status(500).json({
            error: `Erro ao verificar usuário logado!`
        })
    }
}

export default auth