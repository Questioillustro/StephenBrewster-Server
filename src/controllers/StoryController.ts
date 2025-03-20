import {getStories} from "../services/StoryService";

export const getAllStories = async(req: any, res: any) => {
    try {
        const stories = await getStories();
        res.status(200).json(stories);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
}