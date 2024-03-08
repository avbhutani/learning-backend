import mongoose, { connect } from 'mongoose'
import {DB_NAME} from './constant'
import express from 'express'
const app = express();
// this is called a iffies.

// this is one of the approach of connecting the dB, so that whenever the entry point of the application is served, so the DB would also be loaded along with it.

( async ()=> {
    try {
        // connecting to the db, with the url as well as the DB name.
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=> {
            console.log("Error: ",error);
            throw err;
        })

        app.listen(process.env.PORT,()=> {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }
    catch(error) {
        console.error("ERROR: ",error)
        throw err
    }

})()