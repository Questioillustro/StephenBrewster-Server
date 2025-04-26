import {grokPrompt} from "./Grok";
import {claudePrompt} from "./Claude";
import {chatGptPrompt} from "./ChatGpt";
import {IPrompt, LlmOptionType} from "../models/Prompt";

export const llmPrompt = async (prompt: IPrompt, llm: LlmOptionType) : Promise<string | null> => {
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