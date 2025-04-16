import Story from '../models/Story';
import logger from '../config/logger';
import settings from './bav.settings';
import StorySetting from "../models/StorySetting";

export default async function SeedStorySettings() {
  const doSeed = true;

  if (doSeed) {
    logger.info('Seeding Story Settings');

    for (const s of settings) {
      const storySetting = new StorySetting(s);
      await Story.deleteOne({ _id: s._id });
      await storySetting.save();
    }
  } else {
    logger.info(`Not seeding database`);
  }
}
