"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { dbConnect } from "../dataBase/dbConnect"
import Category from "../dataBase/category.model"

export const createCategory= async ({categoryName}:CreateCategoryParams)=>{
    try {
        await dbConnect()
        const newCategory= await Category.create({name:categoryName})
        return JSON.parse(JSON.stringify(newCategory))
    } catch (error) {
        handleError(error)
    }
}

export const getAllCategories = async () => {
    try {
        await dbConnect()
        const allCategory = await Category.find();
        return JSON.parse(JSON.stringify(allCategory))
    } catch (error) {
        handleError(error)
    }
}




