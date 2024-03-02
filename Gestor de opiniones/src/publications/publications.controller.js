import Post from './publications.model.js'
import User  from '../user/user.model.js'
import { validatePostData } from '../utils/validator.js'

// Crear una nueva publicación
export const createPost = async (req, res) => {
    try {
        const postData = req.body
        const errors = validatePostData(postData)
        if (errors.length > 0) {
            return res.status(400).send({ message: 'Validation failed', errors })
        }
        const post = new Post(postData)
        await post.save()
        return res.status(201).send({ message: 'Post created successfully', post })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating post', error: err })
    }
}

// Editar una publicación existente
export const editPost = async (req, res) => {
    try {
        const postId = req.params.id
        const postData = req.body
        const errors = validatePostData(postData)
        if (errors.length > 0) {
            return res.status(400).send({ message: 'Validation failed', errors })
        }
        const updatedPost = await Post.findByIdAndUpdate(postId, postData, { new: true })
        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' })
        }
        return res.send({ message: 'Post updated successfully', post: updatedPost })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating post', error: err })
    }
}

export const deletePost = async (req, res) => {
    try {
        // Capture the ID of the post to delete from the request parameters
        const { id } = req.params;

        // Delete the post
        const deletedPost = await Post.deleteOne({ _id: id });

        // Validate if deleted
        if (deletedPost.deletedCount === 0) {
            return res.status(404).send('Post not found or not deleted');
        }

        // Respond with a success message
        return res.send('Post deleted successfully');
    } catch (err) {
        console.error(err);
        // If there's an error, respond with an error message
        return res.status(500).send('Error deleting post');
    }
};
