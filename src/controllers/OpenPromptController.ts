﻿import {Request, Response} from "express";
import {IPrompt, LlmOptionType} from "../models/Prompt";
import logger from "../config/logger";
import {llmPrompt} from "../llm/PromptDispatcher";

interface IOpenPromptRequest {
  prompt: string;
  llmIdentifier?: LlmOptionType;
  bypassCache?: boolean;
}

const promptCache = new Map<string, string>();
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
    const promptStr = reqBody.prompt;
    const llm: LlmOptionType = reqBody.llmIdentifier ?? 'grok';
    const bypassCache: boolean = reqBody.bypassCache ?? false;

    logger.info(`Open prompt request. Prompt: ${promptStr}`);

    if (!bypassCache) {
      const cachedResponse = promptCache.get(promptStr);
      if (cachedResponse) {
        logger.info(`Serving cached response for prompt: ${promptStr}`);
        return res.status(200).json(cachedResponse);
      }
    }

    const prompt: IPrompt = {
      prompt: promptStr,
      systemContext: 
        `Don't include \`\`\`json wrapping string, only JSON data.
        Make sure to properly escape control characters so the result can be parsed as JSON.`,
    };
    
    const response: string | null = await llmPrompt(prompt, llm);
    
    if (!response) {
      throw 'NULL response from LLM';
    }
    
    const parsed = JSON.parse(response!);
    const cleaned = JSON.stringify(parsed);

    promptCache.set(promptStr, cleaned);
    res.status(200).json(cleaned);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};