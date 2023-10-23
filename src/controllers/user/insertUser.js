import user from '../../models/userModel.js'
import bcrypt from 'bcrypt'

const insertUser = async (req, res) => {
    try{
        const userData = req.body
        bcrypt.hash(userData.pass, 10, async (error, hash) => {
            if (error) return res.status(500).json({
                error: "Erro ao gerar senha criptografada!",
            })
            userData.pass = hash
            const [result] = await user.create(userData)
            delete userData.pass
            if(result.affectedRows === 1){
                res.json({
                    success: "Usuário inserido com Sucesso!",
                    user: {
                        id: result.insertId,
                        ...userData
                    }
                })
            }
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default insertUser