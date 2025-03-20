import express from 'express';
import {getAllStories} from "../controllers/StoryController";

const router = express.Router();

router.get('/stories', getAllStories);

export default router;