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

export const getOpenPrompt = async (req: Request, res: Response) => {
  try {
    const reqBody: IOpenPromptRequest = req.body;
    const promptStr = reqBody.prompts.join('|');
    
    logger.info(`Open prompt request. Prompts: ${promptStr}`);
    
    const prompt: IPrompt = {
      prompt: promptStr,
      systemContext: `You are an assistant with real-time web search capabilities. Provide the most current information available as of ${new Date()}.`,
    };
    
    const response: ChatCompletionMessage = await grokPrompt(prompt);
    const parsed = JSON.parse(response.content!);
    const cleaned = JSON.stringify(parsed);
    
    logger.info(`Prompt response: ${cleaned}`);
    
    res.status(200).json(cleaned);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};