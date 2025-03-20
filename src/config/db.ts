import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {ConnectionOptions} from "node:tls";
import SeedStories from "../seed/Stories";
import logger from "./logger";

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(`${mongoUri}/cyoa`, {} as ConnectionOptions)
        logger.info(`Connected to mongoDB`);
        SeedStories();
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDb;