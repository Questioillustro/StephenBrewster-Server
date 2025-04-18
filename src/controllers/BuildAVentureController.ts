import { IPrompt } from '../models/Prompt';
import logger from '../config/logger';
import Adventure, {AdventureSchemaZod, IAdventure, ZodSchemaString} from '../models/Adventure';
import { Request, Response } from 'express';
import {LLMIdentifier, llmPrompt} from "../llm/PromptDispatcher";
import {z} from 'zod';

export const getQuickAdventure = async (req: Request, res: Response) => {
  try {
    const temperature = req.body.temperature;
    const llm = req.body.llm;
    const characterPrompts = req.body.character;

    const storyPrompts = getStoryPrompts(req);
    const systemPrompts = getSystemContextPrompts(characterPrompts);

    const prompt: IPrompt = {
      prompt: storyPrompts,
      systemContext: systemPrompts,
      temperature: temperature
    };

    const rawResponse: string | null = await llmPrompt(prompt, llm as LLMIdentifier);
    
    logger.info(`Raw Response: ${rawResponse}`)
    
    if (!rawResponse) throw SyntaxError();
    
    const parsed = JSON.parse(rawResponse);
          
    const adventure: IAdventure = {
      contextPrompts: systemPrompts,
      adventure: parsed,
      storyPrompts: storyPrompts,
    };

    const savedAdventure = await saveAdventure(adventure);
    logger.info(`Adventure saved, id=${savedAdventure._id}`);
    res.status(200).json(savedAdventure);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed:", error.errors);
      res.status(400).json({ message: "Response does not match the expected schema" });
    } else if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
      res.status(400).json({ message: "Failed to parse response as JSON" });
    } else {
      console.error("OpenAI API error:", error.message);
      res.status(400).json({ message: "Failed to get a valid response from OpenAI" });
    }
  }
};

const saveAdventure = async (adventure: IAdventure) => {
  try {
    const adventureDb = new Adventure(adventure);
    const savedAdventure = await adventureDb.save();
    logger.info(`New adventure saved`);
    return savedAdventure;
  } catch (error) {
    logger.error(`Failed to save adventure: ${error instanceof Error ? error.message : 'Unknown'}`);
    throw error; 
  }
};

const getPromptFromParagraph = (paragraph: string): string => {
  const regex = /<span[^>]*>(.*?)<\/span>/;
  const match = paragraph.match(regex);
  return match?.[1] ?? '';
};

const getSystemContextPrompts = (characterPrompts: string): string => {
  const MAIN_CHARACTER_DESC = `Main character description: ${characterPrompts}.`;
  const JSON_FORMAT = `Respond with JSON that matches this schema: ${ZodSchemaString}.`
  const NO_LINE_BREAKS = `Do not include line breaks or '\n' strings.`;
  const NO_THE_END = `Do not finish with 'The End'.`;
  const CREATE_IMAGE_PROMPT = `For each page create an llm prompt that we can use to 
  generate an image for that page which includes: descriptions for each character in the scene, a description 
  of the scenery if relevant.`;
  const MIN_LENGTH = `Make it at least 7 pages long.`;

  const systemContextArray = [];
  systemContextArray.push(MAIN_CHARACTER_DESC);
  systemContextArray.push(NO_LINE_BREAKS);
  systemContextArray.push(NO_THE_END);
  systemContextArray.push(CREATE_IMAGE_PROMPT);
  systemContextArray.push(MIN_LENGTH);
  systemContextArray.push(JSON_FORMAT);

  const asString = systemContextArray.join(' ');
  logger.info(`Full System Context: [${asString}]`);
  return asString;
};

const getStoryPrompts = (req: any): string => {
  logger.info(`gettingStoryPrompts: request is: ${JSON.stringify(req.body)}`);

  let storyPromptArray: string[] = [req.body.prompts];

  const asString = storyPromptArray.join('|');

  logger.info(`Full set of story prompts: [${asString}]`);
  return asString;
};
