import session from "../../models/sessionModel.js"
const logout = async (req, res) => {
    try{
        const token = req.cookies.token
        if(token){
            await session.remove(token)
            res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true })
        }
        res.json({
            success: `Usuário Deslogado com Sucesso!`
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
}

export default logout