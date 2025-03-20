import express from 'express';
import { getQuickAdventure } from '../controllers/QuickAdventureController';

const router = express.Router();

router.post('/quickadventure/:id', getQuickAdventure);

export default router;
