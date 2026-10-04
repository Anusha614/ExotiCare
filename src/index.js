import connectDB from './db/index.js'
import express from 'express';

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