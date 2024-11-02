import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: {
        type: [String]
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: () => {
            Date.now()
        }
    },
    imageUrl: { type: String }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePasswords = async function (inputPassword) {
    return bcrypt.compare(inputPassword, this.password)
}

export default mongoose.model('User', userSchema)