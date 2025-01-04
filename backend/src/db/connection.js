import mongoose from "mongoose";
import config from "../config/config.js";

async function connectToDatabase() {
    try {
        await mongoose.connect(config.database.MONGO_URL)
        console.log('Connected to database success')
    } catch (error) {
        console.log(error)
        console.log('Error while connecting to db')
        process.exit(1)
    }
}

export default connectToDatabase