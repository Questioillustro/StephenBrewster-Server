import mongoose from 'mongoose';

export interface IStory {
  _id: string;
  systemContext: string[];
  name: string;
  imageUrl: string;
  description: string;
  quickStoryPrompts: string[];
}

export const storySchema = new mongoose.Schema({
  _id: String,
  systemContext: [String],
  name: String,
  imageUrl: String,
  description: String,
  quickStoryPrompts: [String],
});

const Story = mongoose.model('Story', storySchema);

export default Story;
