import express from 'express'
import { validateJwt, isUser } from '../middlewares/validate-jwt.js'

import { testing, registerUser, login, update } from './user.controller.js'

const api = express.Router()

//registrar usuario
api.post('/register', registerUser)

//Logear el usuario
api.post('/login', login)

//Rutas valida la información admin
api.get('/test', [validateJwt, isUser], testing)
// Actualiza el usuario
api.put('/update/:id', [validateJwt], update)

export default api
