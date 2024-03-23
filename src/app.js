import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

// Basically cors is a middleware, extra features can also be added to the cors method, this origin will help us to specify ki frontend me kahan kahan se request aa skti hai.

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true 
}))

// for accepting the json files kyunki request jo hai json ke format me bhi aaskti hai 

app.use(express.json({
    // limit specifies the limit of the json that you can accept.
    limit:'16kb'
}))

// This states the encoding format of the url, kyunki requests jo hai url ke form me bhi aaskti hai na.
// extended true ek broader version deta hai storage ka, nested ke nested form me bhi store kr skte cheezein.
app.use(express.urlencoded({extended:true}))

// pdf,images, jo ki ek public asset ho, vo sb yahan pe store honge. etc. express.static(public) me.
app.use(express.static('public'))


app.use(cookieParser());
// mereko mere server se user ke browser ki cookies access krni hai securely aur fir store bhi krni hai securely.
export { app }