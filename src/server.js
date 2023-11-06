//const express = require('express')
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routers/userRouter.js'
import authRouter from './routers/authRouter.js'
import {PORT} from './config.js' 

const api = express()

var corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}

//converte toda requisição com body json para objeto no req.body
api.use(cors(corsOptions))
api.use(bodyParser.json())
api.use(cookieParser())

api.get('/', (req, res) => {
    res.json({message: "Bem-vindo a nossa API"})
})

api.use('/user', userRouter)
api.use('/auth', authRouter)

api.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}! http://localhost:${PORT}`)
})