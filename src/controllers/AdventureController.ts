import { findByStoryId } from '../services/AdventureService';

export const getByStoryId = async (req: any, res: any) => {
  try {
    const { storyid } = req.params;

    const adventures = await findByStoryId(storyid);
    res.status(200).json(adventures);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
