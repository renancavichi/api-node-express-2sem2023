import user from "../../models/userModel.js"

const updateUser = async (req, res) => {
    try{
        const userData = req.body
        if(userData.id !== req.userLogged.id){
            return res.status(400).json({
                error: `Usuário não autorizado a fazer update.`
            })
        }
        const [result] = await user.update(userData)
        if(result.affectedRows === 1){
            res.json({
                success: "Usuário atualizado com Sucesso!",
                user: {
                    ...userData
                }
            })
        } else {
            res.status(404).json({
                error: `Usuário id: ${userData.id} não Encontrado!`
            })
        }
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default updateUser