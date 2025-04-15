import getGrokModels from "../llm/GrokModelService";
import logger from "../config/logger";

export const getModels = async (req: any, res: any) => {
  try {
    const models = await getGrokModels();
    logger.info(`Grok models ${JSON.stringify(models)}`)
    res.status(200).json(models);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
