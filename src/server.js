const express = require('express')

const api = express()

api.get('/', (req, res) => {
    res.json({message: "Bem-vindo a nossa API"})
})

api.listen(3000, () => {
    console.log('Servidor rodando na porta 3000. http://localhost:3000')
})