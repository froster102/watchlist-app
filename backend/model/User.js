import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: { type: [String] },
    role: { type: String, required: true },
    createdAt: {
        type: Date,
        default: () => {
            Date.now()
        }
    },
    imageUrl: { type: String }
})

export default mongoose.model('User', userSchema)