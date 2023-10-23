import express from 'express'
import login from '../controllers/auth/login.js'
import logout from '../controllers/auth/logout.js'

const router = express.Router()

router.post('/login', login)
router.delete('/logout', logout)

export default router