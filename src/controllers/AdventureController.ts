import { getAllAdventures} from '../services/AdventureService';

export const getAll = async (req: any, res: any) => {
  try {
    const adventures = await getAllAdventures();
    res.status(200).json(adventures);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
