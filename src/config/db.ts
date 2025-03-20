import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {ConnectionOptions} from "node:tls";
import SeedStories from "../seed/Stories";
import logger from "./logger";

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/cyoa', {} as ConnectionOptions)
        logger.info(`Connected to mongoDB`);
        SeedStories();
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDb;