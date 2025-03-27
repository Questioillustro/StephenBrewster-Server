import { IPrompt } from '../models/Prompt';
import logger from '../config/logger';
import Anthropic from "@anthropic-ai/sdk";

const CLAUDE_KEY = process.env.CLAUDE_KEY;

const client = new Anthropic({
  apiKey: CLAUDE_KEY
})

export const claudePrompt = async (props: IPrompt) => {
  const { model, systemContext, prompt } = props;

  logger.info(
    `LLM prompt to Claude: **\nModel: [${model}] \nContext: [${systemContext}]\nPrompt: [${prompt}]\n**`,
  );

  try {
    const completion = await client.messages.create({
      model: model ?? 'claude-3-7-sonnet-20250219',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt ?? 'Tell a story about a 404 not found error, keep it short and snarky.',
        },
      ],
    });

    // Extract the response text from the first content block
    const responseText = JSON.stringify(completion.content);
    logger.info(`Claude response: ${responseText}`);
    return responseText;

  } catch (error: any) {
    logger.error(error.toString());
    throw Error;
  }
};