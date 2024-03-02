'use strict'

import { Router } from 'express'
import {validateJwt} from '../middlewares/validate-jwt.js'
import { addComment, editComment, deleteComment } from './comment.controller.js'

const api = Router()

api.post('/save', addComment)
api.put('/update/:id', [validateJwt], editComment)
api.delete('/delete/id:',[validateJwt], deleteComment)

export default api
