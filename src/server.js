//const express = require('express')
import express from 'express'
import userRouter from './routes/userRouter.js'

const api = express()

api.get('/', (req, res) => {
    res.json({message: "Bem-vindo a nossa API"})
})

api.use('/user', userRouter)

api.listen(3000, () => {
    console.log('Servidor rodando na porta 3000! http://localhost:3000')
})