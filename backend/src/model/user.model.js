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
        type: [String],
        default: []
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
    verificationStatus: {
        type: Boolean,
        default: false
    },
    imageUrl: { type: String }
})

userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email })
    return !!user
}

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePasswords = async function (inputPassword) {
    return bcrypt.compare(String(inputPassword), this.password)
}

const User = mongoose.model('User', userSchema)

export default User
