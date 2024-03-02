import { Schema, model } from 'mongoose'

// Definir el esquema del comentario
const commentSchema = Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
)

// Crear el modelo de Comentario
export default model('comment', commentSchema)
