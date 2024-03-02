import Comment from './comment.model.js'
import { checkUpdate } from '../utils/validator.js'
// Agregar un nuevo comentario a una publicación
export const addComment = async (req, res) => {
    try {
        const commentData = req.body
        const comment = new Comment(commentData)
        await comment.save()
        return res.status(201).send({ message: 'Comment added successfully', comment })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding comment', error: err })
    }
}

// Editar un comentario existente
export const editComment = async (req, res) => {
    try {
        // Capture the data
        let data = req.body;
        // Capture the comment ID to update
        let { id } = req.params;
        
        // Check for data and validate the update
        let update = checkUpdate(data, false);
        if (!update) {
            return res.status(400).send({ message: 'Some submitted data cannot be updated or is missing' });
        }
        
        // Update the comment
        let updatedComment = await Comment.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('author', ['content', 'createdAt']) //Eliminar la información sensible
        
        // Validate the comment update
        if (!updatedComment) {
            return res.status(404).send({ message: 'Comment not found or not updated' });
        }
        
        // Respond if everything goes well
        return res.send({ message: 'Comment updated successfully', updatedComment });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating the comment' });
    }
};


// Eliminar un comentario existente
export const deleteComment = async (req, res) => {
    try {
        // Captura el ID del comentario a eliminar
        const { id } = req.params;
        // Elimina el comentario
        const deletedComment = await Comment.deleteOne({ _id: id });
        // Valida si se eliminó
        if (deletedComment.deletedCount === 0) {
            return res.status(404).send({ message: 'Comentario no encontrado o no eliminado' });
        }
        // Responde
        return res.send({ message: 'Comentario eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al eliminar el comentario' });
    }
};