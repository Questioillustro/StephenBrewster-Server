import { getStoryById } from '../services/StoryService';
import { llmPrompt } from '../llm/ChatGpt';
import { IPrompt } from '../models/Prompt';
import logger from '../config/logger';
import { IStory } from '../models/Story';
import Adventure, { IAdventure, IAdventureStep } from '../models/Adventure';
import { Request, Response } from 'express';
import OpenAI from 'openai/index';
import ChatCompletionMessage = OpenAI.ChatCompletionMessage;

export const getQuickAdventure = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const story: IStory | null = await getStoryById(id);

    if (!story) {
      logger.error(`Getting story by id [${id}] returned NULL`);
      res.status(404).json(`Story not found for id [${id}]`);
    } else {
      logger.info(`Getting quick adventure for: [${JSON.stringify(story.name)}]`);

      const storyPrompts = getStoryPrompts(story, req);
      const systemPrompts = getSystemContextPrompts(story);

      const prompt: IPrompt = {
        prompt: storyPrompts,
        systemContext: systemPrompts,
      };

      const response: ChatCompletionMessage = await llmPrompt(prompt);
      logger.info(`[Quick adventure response received from LLM]`);

      const adventure: IAdventure = {
        contextPrompts: systemPrompts,
        imageUrl: story.imageUrl,
        steps: [],
        storyId: story._id,
        storyPrompts: storyPrompts,
      };

      if (response.content !== null) {
        await saveAdventure(response.content, adventure);
      } else {
        logger.error(`No content in ChatGpt response`);
      }

      res.status(200).json(adventure);
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
    await adventureDb.save();
    logger.info(`New adventure saved for story id: [${adventureDb.storyId}]`);
  } catch (error) {
    logger.error(`Failed to save adventure: ${error instanceof Error ? error.message : 'Unknown'}`);
    throw error; // Let caller handle it
  }

  return adventure;
};

const getPromptFromParagraph = (paragraph: string): string => {
  const regex = /<span[^>]*>(.*?)<\/span>/;
  const match = paragraph.match(regex);
  return match?.[1] ?? '';
};

const getSystemContextPrompts = (story: IStory): string => {
  const STORY_BLOCK_CLASSES = `story-block`;
  const HTML_FORMAT_RESPONSE_CONTEXT = `Format the responses by wrapping the paragraphs in div elements with a class called '${STORY_BLOCK_CLASSES}'`;
  const NO_LINE_BREAKS = `Do not include line breaks or '\n' strings`;
  const NO_THE_END = `Do not finish with 'The End'`;
  const CREATE_IMAGE_PROMPT = `For each paragraph create a prompt that we can use to generate an image for that paragraph, add it to the end of the paragraph wrapped in a span tag that is styled to be hidden`;
  const DELIMITER = `Separate each paragraph with a '|' delimiter`;
  const MIN_LENGTH = `Make it at least 7 paragraphs long`;

  const systemContextArray = [];
  systemContextArray.push(story.systemContext);
  systemContextArray.push(HTML_FORMAT_RESPONSE_CONTEXT);
  systemContextArray.push(NO_LINE_BREAKS);
  systemContextArray.push(NO_THE_END);
  systemContextArray.push(CREATE_IMAGE_PROMPT);
  systemContextArray.push(DELIMITER);
  systemContextArray.push(MIN_LENGTH);

  const asString = systemContextArray.join('|');
  logger.info(`Full System Context: [${asString}]`);
  return asString;
};

const getStoryPrompts = (story: IStory, req: any): string => {
  logger.info(`gettingStoryPrompts: request is: ${JSON.stringify(req.body)}`);

  let storyPromptArray: string[] = [];
  storyPromptArray = storyPromptArray.concat(story.quickStoryPrompts ?? []);

  const { prompts } = req.body;
  if (Array.isArray(prompts) && prompts.every((p) => typeof p === 'string')) {
    storyPromptArray = storyPromptArray.concat(prompts);
  }

  const asString = storyPromptArray.join('|');

  logger.info(`Full set of story prompts: [${asString}]`);
  return asString;
};
