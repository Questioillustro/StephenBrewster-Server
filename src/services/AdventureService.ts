import Adventure, { IAdventure } from '../models/Adventure';

export const findById = async (id: string): Promise<IAdventure | null> => {
  return Adventure.findOne({ _id: id });
};

export const getAllAdventures = async(): Promise<IAdventure[] | null> => {
  return Adventure.find({});
}
