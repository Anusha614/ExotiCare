import express from 'express';
import mongoose from 'mongoose';
import {DB_NAME} from '../constants.js';
import dotenv from "dotenv";
dotenv.config({ path: './.env' })

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        if (connectionInstance) {
            console.log(`mongoDB connected: ${connectionInstance.connection.host}`)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default connectDB