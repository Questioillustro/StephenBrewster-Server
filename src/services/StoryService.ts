import Story, {IStory} from "../models/Story";

export const getStories = async () => {
    return Story.find();
}

export const getStoryById = async (id: string): Promise<IStory | null> => {
    return Story.findOne({ _id: id });
}