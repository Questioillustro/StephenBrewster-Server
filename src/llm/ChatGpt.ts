import OpenAI from 'openai';
import { IImagePrompt, IPrompt } from '../models/Prompt';
import logger from '../config/logger';

const chatGptKey = process.env.CHAT_GPT_KEY;

const openai = new OpenAI({
  apiKey:
    `${chatGptKey}`,
});

export const chatGptPrompt = async (props: IPrompt): Promise<string | null> => {
  const { model, systemContext, prompt } = props;

  logger.info(
    `LLM prompt to ChatGPT: **\nModel: [${model}] \nContext: [${systemContext}]\nPrompt: [${prompt}]\n**`,
  );

  const completion = await openai.chat.completions.create({
    model: model ?? 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          systemContext ??
          'You are telling a story that is intended for adults that need to be scolded for their forgetfulness',
      },
      {
        role: 'user',
        content: prompt ?? 'Tell a story about a 404 not found error, keep it short and snarky.',
      },
    ],
  });

  return completion.choices[0].message.content;
};

export const imagePrompt = async (props: IImagePrompt): Promise<string | null> => {
  const { model, size, quality, imageCount, prompt } = props;
  logger.info(
    `Image prompt to ChatGPT:  **\nModel: [${model}] \nSize: [${size}]\nQuality: [${quality}]\nImageCount: [${imageCount}]\nPrompt: [${prompt}]\n**`,
  );

  const response = await openai.images.generate({
    response_format: 'b64_json',
    prompt: `cartoon artwork, children's book, ${prompt}`,
    model: model ?? 'dall-e-3',
    size: size ?? '1024x1024',
    quality: quality ?? 'standard',
    n: imageCount ?? 1,
  });

  const b64Json = response.data[0].b64_json;
  if (b64Json !== undefined) return b64Json;
  else return null;
};
