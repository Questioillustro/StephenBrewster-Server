import Story from '../models/Story';
import logger from '../config/logger';
import stories from './cyoa.stories';

export default async function SeedStories() {
  const doSeed = true;

  if (doSeed) {
    logger.info('Seeding Stories');

    for (const s of stories) {
      const story = new Story(s);
      await Story.deleteOne({ _id: s._id });
      await story.save();
    }
  } else {
    logger.info(`Not seeding database`);
  }
}
