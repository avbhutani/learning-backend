import mongoose,{Schema} from 'mongoose'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema(
    {
        username: {
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email: {
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true
        },
        fullname: {
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar: {
            type:String, // cloudinary url
            required:true
        },
        coverImage: {
            type:String, // cloudinary url
        },
        watchHistory: {
            type:Schema.Types.ObjectId,
            ref:'Video'
        },
        password: {
            type:String,
            required:[true,'Password is required']
        },

        // what is this?
        refreshToken: {
            type:String,
        }

    },{timestamps:true});


    // async function as it can take time.
userSchema.pre("save",async function (next) {
    if(!this.idModified('password')) {
        return next()
    }
    this.password = bcrypt.hash(this.password,10);
    next()
})


// custom method for checking if the password is correct or not.
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}


// custom mehtod for generating the access token.
userSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// for generating the refresh token.
userSchema.methods.generateRefreshToken = function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model('User',userSchema);