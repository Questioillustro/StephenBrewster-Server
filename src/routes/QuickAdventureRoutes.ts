import express from 'express';
import { getQuickAdventure } from '../controllers/QuickAdventureController';

const router = express.Router();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Max 10 requests per IP
  message: { error: 'Too many requests, please try again later.' },
});

router.post('/buildaventure', limiter, getQuickAdventure);

export default router;
