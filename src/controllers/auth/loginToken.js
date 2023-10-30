import user from '../../models/userModel.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config.js'

const loginToken = async (req, res) => {
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                error: `Usuário Deslogado!`
            })
        }
        const userToken = jwt.verify(token, TOKEN_SECRET)
        console.log(userToken)
        const [rows] = await user.getById(userToken.id)
        if(rows.length === 0){
            return res.status(400).json({
                error: `Usuário não encontrado!`
            })
        }
        const userFound = rows[0]
        res.json({
            success: "Usuário logado com token!",
            user: {
                id: userToken.id,
                ...userFound
            }
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default loginToken