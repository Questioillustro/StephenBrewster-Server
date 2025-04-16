import { getStoryById } from '../services/StoryService';
import { IPrompt } from '../models/Prompt';
import logger from '../config/logger';
import { IStory } from '../models/Story';
import Adventure, { IAdventure, IAdventureStep } from '../models/Adventure';
import { Request, Response } from 'express';
import {LLMIdentifier, llmPrompt} from "../llm/PromptDispatcher";

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
    };

    const response: string | null = await llmPrompt(prompt, llm as LLMIdentifier);
          
    const adventure: IAdventure = {
      contextPrompts: systemPrompts,
      steps: [],
      storyPrompts: storyPrompts,
    };

    if (response !== null) {
      const savedAdventure = await saveAdventure(response, adventure);
      logger.info(`Adventure saved, id=${savedAdventure._id}`);
      res.status(200).json(savedAdventure);
    } else {
      logger.error(`No content in ChatGpt response`);
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

const saveAdventure = async (storyText: string, adventure: IAdventure) => {
  const paragraphs = storyText.split('|');
  const steps: IAdventureStep[] = [];

  paragraphs.forEach((p) => {
    const trimmed = p.trim();
    if (trimmed) {
      steps.push({
        text: trimmed,
        imagePrompt: getPromptFromParagraph(p),
        imageUrl: null,
      });
    }
  });
  adventure.steps = steps;

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
  const STORY_BLOCK_CLASSES = `story-block`;
  const HTML_FORMAT_RESPONSE_CONTEXT = `Format the responses by wrapping the paragraphs in 
  div elements with a class called '${STORY_BLOCK_CLASSES}'`;
  const MAIN_CHARACTER_DESC = `Here is the main character description to use in each llm prompt: ${characterPrompts}`;
  const NO_LINE_BREAKS = `Do not include line breaks or '\n' strings`;
  const NO_THE_END = `Do not finish with 'The End'`;
  const CREATE_IMAGE_PROMPT = `For each paragraph create an llm prompt that we can use to 
  generate an image for that paragraph which includes: descriptions for each character in the scene, a description 
  of the scenery if available, add the prompt to the end of the paragraph wrapped in a span tag that is styled to be hidden.`;
  const DELIMITER = `Separate each paragraph with a '|' delimiter`;
  const MIN_LENGTH = `Make it at least 7 paragraphs long`;

  const systemContextArray = [];
  systemContextArray.push(HTML_FORMAT_RESPONSE_CONTEXT);
  systemContextArray.push(MAIN_CHARACTER_DESC);
  systemContextArray.push(NO_LINE_BREAKS);
  systemContextArray.push(NO_THE_END);
  systemContextArray.push(CREATE_IMAGE_PROMPT);
  systemContextArray.push(DELIMITER);
  systemContextArray.push(MIN_LENGTH);

  const asString = systemContextArray.join('|');
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
