import Adventure, { IAdventure } from '../models/Adventure';

export const findByStoryId = async (storyid: string): Promise<IAdventure[] | null> => {
  return Adventure.find({ storyId: storyid });
};

export const findById = async (id: string): Promise<IAdventure | null> => {
  return Adventure.findOne({ _id: id });
};
