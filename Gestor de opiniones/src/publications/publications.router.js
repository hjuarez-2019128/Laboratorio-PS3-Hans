
import express from 'express'
import { validateJwt} from '../middlewares/validate-jwt.js'
import {createPost, editPost, deletePost} from './publications.controller.js'


const api = express.Router();

api.post('/save',createPost)
api.put('/update/:id',[validateJwt],editPost )
api.delete('/delete/:id', [validateJwt],deletePost)


export default api