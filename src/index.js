import dotenv from 'dotenv'
import connectDB from './db/index.js'
import express from 'express'
const app = express()

dotenv.config({
    path:'./env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT || 8000}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// basically each of the async function when executed returns a callback, so these .then and .catch() can be added with all of them.
// catch block is used for handling the errors.

