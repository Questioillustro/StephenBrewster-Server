import express from 'express';
import { getByStoryId } from '../controllers/AdventureController';

const router = express.Router();

router.get('/adventure/:storyid', getByStoryId);

export default router;
