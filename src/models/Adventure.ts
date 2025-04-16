import mongoose from 'mongoose';
import {IStory, storySchema} from "./Story";

export interface IAdventure {
  _id?: string;
  contextPrompts: string;
  storyPrompts: string;
  steps: IAdventureStep[];
}

export interface IAdventureStep {
  text: string;
  imagePrompt: string;
  imageUrl: string | null;
}

const adventureSchema = new mongoose.Schema({
  contextPrompts: [String],
  storyPrompts: [String],
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
