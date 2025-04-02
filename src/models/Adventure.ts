import mongoose from 'mongoose';
import {IStory, storySchema} from "./Story";

export interface IAdventure {
  _id?: string;
  storyId: string;
  contextPrompts: string;
  storyPrompts: string;
  imageUrl: string;
  steps: IAdventureStep[];
  story: IStory;
}

export interface IAdventureStep {
  text: string;
  imagePrompt: string;
  imageUrl: string | null;
}

const adventureSchema = new mongoose.Schema({
  storyId: String,
  story: storySchema,
  contextPrompts: [String],
  storyPrompts: [String],
  imageUrl: String,
  steps: [
    {
      text: String,
      imagePrompt: String,
      imageUrl: String,
    },
  ],
});

const Adventure = mongoose.model('Adventure', adventureSchema);

export default Adventure;
