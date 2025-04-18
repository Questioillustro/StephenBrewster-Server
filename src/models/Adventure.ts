import mongoose from 'mongoose';
import {z} from 'zod';

// ZOD
const PageSchemaZod = z.object({
  text: z.string(),
  imagePrompt: z.string(),
});

export const AdventureSchemaZod = z.object({
  pages: z.array(PageSchemaZod),
  title: z.string()
});

export const ZodSchemaString = `{ pages: [ { text, imagePrompt } ], title }`;

// MONGOOSE
const PageSchemaMongoose = new mongoose.Schema({
  text: { type: String, required: true, minlength: 1 },
  imagePrompt: { type: String, required: true, minlength: 1 },
  imageUrl: { type: String, required: false}
});

const AdventureSchemaMongoose = new mongoose.Schema({
  pages: { type: [PageSchemaMongoose], required: false },
  title: { type: String, required: false}
});

const AdventureDBSchema = new mongoose.Schema({
  contextPrompts: { type: String },
  storyPrompts: { type: String },
  artStyle: { type: String },
  adventure: { type: AdventureSchemaMongoose }
});

const Adventure = mongoose.model('Adventure', AdventureDBSchema);
export default Adventure;

interface IAdventurePage {
  text: string;
  imagePrompt: string;
  imageUrl: string;
}

export interface IAdventure {
  _id?: string;
  contextPrompts: string;
  storyPrompts: string;
  artStyle: string;
  adventure: { 
    pages: IAdventurePage[];
    title: string;
  };
}


