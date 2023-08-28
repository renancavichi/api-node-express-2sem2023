import user from '../../models/userModel.js'

const getUser = async (req, res) => {
    try{
        const userData = req.body
        const [rows] = await user.getById(userData.id)
        if(rows.length === 0){
            res.status(404).json({
                error: `Usuário id: ${userData.id} não Encontrado!`
            })
        } else {
            res.json({
                success: "Usuário Encontrado com Sucesso",
                user: rows[0] 
            })
        }
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default getUser