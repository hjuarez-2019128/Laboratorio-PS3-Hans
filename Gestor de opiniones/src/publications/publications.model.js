import { Schema, model } from 'mongoose'

const publicactionsSchema = Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    },
    {
        versionKey: false,
    }
)

export default model('publication', publicactionsSchema)
