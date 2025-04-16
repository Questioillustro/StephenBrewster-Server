import mongoose from 'mongoose';

export interface IStorySetting {
  _id: string;
  name: string;
  imageUrl: string;
  prompt: string;
}

export const storySettingSchema = new mongoose.Schema({
  _id: String,
  name: String,
  imageUrl: String,
  prompt: String,
});

const StorySetting = mongoose.model('StorySetting', storySettingSchema);

export default StorySetting;
