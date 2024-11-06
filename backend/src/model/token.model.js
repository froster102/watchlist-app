import mongoose from "mongoose";
import tokenTypes from "../config/token.js";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        index: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL]
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Token = mongoose.model('Token', tokenSchema)

export default Token