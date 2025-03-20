import Groq from 'groq-sdk';
import { IImagePrompt, IPrompt } from '../models/Prompt';
import logger from '../config/logger';

const grokKey = process.env.GROK_KEY;

const groq = new Groq({
  apiKey: `${grokKey}`,
});

export const llmPrompt = async (props: IPrompt) => {
  const { model, systemContext, prompt } = props;

  logger.info(
    `LLM prompt to Grok: **\nModel: [${model}] \nContext: [${systemContext}]\nPrompt: [${prompt}]\n**`,
  );

  try {
    const completion = await groq.chat.completions.create({
      model: model ?? 'grok-2-1212',
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
    return completion.choices[0].message;
  } catch (error: any) {
    logger.error(error.toString());
    throw Error;
  }
};
