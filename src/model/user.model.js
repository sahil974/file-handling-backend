import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

userSchema.methods.generateAuthToken = function () {
    const genToken = jwt.sign(
        {
            userId: this._id,
            email: this.email,
            avatar: this.avatar,
            name: this.name
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRY,
        }
    )

    return genToken
}


export const User = mongoose.model("User", userSchema)



