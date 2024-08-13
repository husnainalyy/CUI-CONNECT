'use server'

import { revalidatePath } from 'next/cache'

import {dbConnect} from '../dataBase/dbConnect'
import User from '../dataBase/user.model'
import Order from '../dataBase/order.model'
import Event from '../dataBase/event.model'
import { handleError } from '@/lib/utils'

import { CreateUserParams, UpdateUserParams } from '@/types'
export const createUser = async (user: CreateUserParams) => {
    try {
        await dbConnect();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await dbConnect();
        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });
        if (!updatedUser) throw new Error('User update failed')
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

export const getUserById = async (clerkId: string) => {
    try {
        await dbConnect();
        const user = await User.findOne({ clerkId });
        if (!user) throw new Error('User not found')
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

export const getUsers = async () => {
    try {
        await dbConnect();
        const users = await User.find();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        handleError(error);
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await dbConnect();
        const userToDelete = await User.findOne({ clerkId });
        if (!userToDelete) throw new Error('User not found')

        await Promise.all([
            Event.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { originzer: userToDelete._id } }
            ),
            Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
        ])

        const deletedUser = await User.findByIdAndDelete(userToDelete._id)
        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
        handleError(error)
    }
}