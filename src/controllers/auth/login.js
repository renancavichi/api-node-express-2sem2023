import user from '../../models/userModel.js'
import session from '../../models/sessionModel.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config.js'

const login = async (req, res) => {
    try{
        const userData = req.body
        const [rows] = await user.getByEmail(userData.email)
        if(rows.length === 0){
            return res.status(400).json({
                error: `Usuário ou senha inválidos!`
            })
        } 
        const userFound = rows[0]
        let passIsValid = false
        try{
            passIsValid = await compare(userData.pass, userFound.pass)
            console.log(passIsValid)
        } catch (error){
            return res.status(400).json({
                error: `Usuário ou senha inválidos!`
            })
        }
        if(!passIsValid){
            return res.status(400).json({
                error: `Usuário ou senha inválidos!`
            })
        }
        const token = jwt.sign({
            id: userFound.id,
            name: userFound.name
        }, TOKEN_SECRET)    
        await session.create(userFound.id, token)
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 90 * 24 * 60 * 60 * 1000 })
        return res.json({
            success: `Usuário Logado com Sucesso!`,
            user: {
                id: userFound.id,
                name: userFound.name,
                email: userFound.email,
                photo: userFound.photo,
            }
            
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }

}

export default login