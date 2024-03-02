'use strict'
import bcrypt from 'bcrypt';
import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const testing = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}
export const registerUser = async (req, res) => {
    try {
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'USER'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save() //Guardar en la BD
        //Responder al usuario
        return res.send({ message: `Registered successfully, can be logged with username ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        //Capturar los datos (body)
        let { username, password, email } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({ username, email }) //buscar un solo registro
        //Verifico que la contraseña coincida
        if (user && (await checkPassword(password, user.password))) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
                role: user.role,
            }
            //Generar el Token
            let token = await generateJwt(loggedUser)
            //Respondo al usuario
            return res.send({
                message: `Welcome ${loggedUser.name}`,
                loggedUser,
                token,
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}


export const update = async (req, res) => {
    try {
        const { id } = req.params;
        let data = req.body;

        const isValidUpdate = checkUpdate(data, id);
        if (!isValidUpdate) return res.status(400).send({ message: 'Some data cannot be updated or missing' });

        // Si hay una contraseña en los datos recibidos, encriptarla antes de actualizarla
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
        }

        // Actualizar el usuario en la base de datos
        let updatedUser = await User.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!updatedUser) return res.status(401).send({ message: 'User not found or not updated' });

        return res.send({ message: 'User updated', updatedUser });
    } catch (err) {
        console.error(err);
        // Manejo de errores específicos
        if (err.keyValue && err.keyValue.username) {
            return res.status(400).send({ message: `Username ${err.keyValue.username} is already taken` });
        }
        return res.status(500).send({ message: 'Error updating account' });
    }
}