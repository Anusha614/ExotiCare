import connectDB from './db/index.js'
import express from 'express';
import dotenv from "dotenv";
dotenv.config({ path: './.env' })

const app = express()


connectDB()
.then(() => {
    app.listen(process.env.PORT||8000, () => {
        console.log(`server running on port ${process.env.PORT||8000}`)
    })
})
.catch((error) => {
    console.log(error)
})