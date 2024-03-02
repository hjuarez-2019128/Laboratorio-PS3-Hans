
// const Product = require('./productModel');
//import Product from('../product/product.model')

//Validar diferentes datos.
'use strict'

import { hash, compare } from 'bcrypt'

//Encriptar la contraseña
export const encrypt = (password)=>{
    try{
        return hash(password, 10)
    }catch(err){
        console.error(err)
        return err
    }
}

//Validar la contraseña
export const checkPassword = async(password, hash)=>{
    try{
        return await compare(password, hash)
    }catch(err){
        console.error(err);
        return err
    }
}

export const checkUpdate = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.password ||
            data.password == '' ||
            data.role ||
            data.role == ''
        ) {
            return false
        }
        return true
    }else{
        if(
            Object.entries(data).length === 0 ||
            data.keeper ||
            data.keeper == ''
        ) {
            return false
        }
        return true
    }
}

export const validatePostData = (postData) => {
    const { title, category, content } = postData;
    const errors = [];

    if (!title || typeof title !== 'string' || title.trim() === '') {
        errors.push('Title is required and must be a non-empty string');
    }

    if (!category || typeof category !== 'string' || category.trim() === '') {
        errors.push('Category is required and must be a non-empty string');
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
        errors.push('Content is required and must be a non-empty string');
    }

    return errors;
};