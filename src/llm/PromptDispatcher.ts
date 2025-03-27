import {grokPrompt} from "./Grok";
import {claudePrompt} from "./Claude";
import {chatGptPrompt} from "./ChatGpt";
import {IPrompt} from "../models/Prompt";

export type LLMIdentifier = 'grok' | 'claude' | 'chatgpt';

export const llmPrompt = async (prompt: IPrompt, llm: LLMIdentifier) : Promise<string | null> => {
  switch (llm) {
    case 'grok':
      return await grokPrompt(prompt);
    case 'claude':
      return await claudePrompt(prompt);
    case 'chatgpt':
      return await chatGptPrompt(prompt);
    default:
      return 'LLM not recognized'
  }
}