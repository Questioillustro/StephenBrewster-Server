﻿import { imagePrompt } from '../llm/ChatGpt';
import { findById } from '../services/AdventureService';
import Adventure from '../models/Adventure';
import { uploadImage } from '../azure/CosmosService';

export const generateImage = async (req: any, res: any) => {
  try {
    const prompt: string = req.body.prompt;
    const id: string = req.params.id;
    const index: number = req.params.index;

    const adventure = await findById(id);
    if (!adventure) res.status(404).json('Failed to get adventure');

    const base64Image = await imagePrompt({ prompt: prompt });
    if (!base64Image) res.status(404).json('Failed to get image from AI');

    const azureUrl = await uploadImage(base64Image!, {});
    if (!azureUrl) res.status(404).json('Failed to upload image to azure');

    adventure!.steps[index].imageUrl = azureUrl!;

    const adventureDb = new Adventure(adventure);
    await adventureDb.save();

    res.status(200).json(adventure);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
