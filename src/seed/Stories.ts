import Story from '../models/Story';
import logger from '../config/logger';
import stories from './bav.stories';

export default async function SeedStories() {
  const doSeed = true;

  if (doSeed) {
    logger.info('Seeding Stories');

    for (const s of stories) {
      await Story.deleteOne({ _id: s._id });
    }
  } else {
    logger.info(`Not seeding database`);
  }
}
