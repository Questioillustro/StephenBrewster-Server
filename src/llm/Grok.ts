import { IPrompt } from '../models/Prompt';
import logger from '../config/logger';
import OpenAI from "openai";

export const GROK_KEY = process.env.GROK_KEY;
export const GROK_API_URL = process.env.GROK_URL;

const client = new OpenAI({
  apiKey: GROK_KEY,
  baseURL: GROK_API_URL
})

export type GROK_MODELS = 'grok-3-beta' | 'grok-3-mini-beta';

export const grokPrompt = async (props: IPrompt): Promise<string | null> => {
  const { model, systemContext, prompt, temperature } = props;

  logger.info(
    `LLM prompt to Grok: **\nModel: [${model}] \nContext: [${systemContext}]\nPrompt: [${prompt}]\nTemp: [${temperature}]**`,
  );

  try {
    const completion = await client.chat.completions.create({
      model: model ?? 'grok-3-mini-beta',
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
      temperature: temperature,
    });
    return completion.choices[0].message.content;
  } catch (error: any) {
    logger.error(error.toString());
    throw Error;
  }
};
