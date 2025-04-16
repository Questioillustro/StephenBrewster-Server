import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {ConnectionOptions} from "node:tls";
import SeedStories from "../seed/Stories";
import logger from "./logger";
import SeedStorySettings from "../seed/StorySettings";

dotenv.config();

const mongoUri = process.env.MONGO_URI;
logger.info(`MongoURI=${mongoUri}`);

const connectDb = async () => {
    try {
        await mongoose.connect(`${mongoUri}/bav`, {} as ConnectionOptions)
        logger.info(`Connected to mongoDB`);
        // SeedStories();
        // SeedStorySettings();
    } catch (error) {
        logger.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDb;