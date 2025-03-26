import {Request, Response} from "express";
import {IPrompt} from "../models/Prompt";
import logger from "../config/logger";
import {grokPrompt} from "../llm/Grok";
import OpenAI from "openai";
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;

type llm_option = 'grok' | 'chatgpt';

interface IOpenPromptRequest {
  prompts: string[];
  llm: llm_option
}

const promptCache = new Map<string, ChatCompletionMessage>();
let cacheTimeout: NodeJS.Timeout;

function scheduleCacheClear() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0); // Set to next midnight

  const timeToMidnight = midnight.getTime() - now.getTime();

  if (cacheTimeout) {
    clearTimeout(cacheTimeout);
  }

  cacheTimeout = setTimeout(() => {
    promptCache.clear();
    logger.info('Prompt cache cleared at midnight');
    scheduleCacheClear();
  }, timeToMidnight);
}

scheduleCacheClear();

export const getOpenPrompt = async (req: Request, res: Response) => {
  try {
    const reqBody: IOpenPromptRequest = req.body;
    const promptStr = reqBody.prompts.join('|');

    logger.info(`Open prompt request. Prompts: ${promptStr}`);

    const cachedResponse = promptCache.get(promptStr);
    if (cachedResponse) {
      logger.info(`Serving cached response for prompt: ${promptStr}`);
      const parsed = JSON.parse(cachedResponse.content!);
      const cleaned = JSON.stringify(parsed);
      return res.status(200).json(cleaned);
    }

    const prompt: IPrompt = {
      prompt: promptStr,
      systemContext: `You are an assistant with real-time web search capabilities. Provide the most current information available as of ${new Date()}.`,
    };

    const response: ChatCompletionMessage = await grokPrompt(prompt);
    const parsed = JSON.parse(response.content!);
    const cleaned = JSON.stringify(parsed);

    // Store in cache
    promptCache.set(promptStr, response);
    logger.info(`Prompt response cached: ${cleaned}`);

    res.status(200).json(cleaned);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};