import express from 'express';
import {getOpenPrompt} from "../controllers/OpenPromptController";

const router = express.Router();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Max 10 requests per IP
  message: { error: 'Too many requests, please try again later.' },
});

router.post('/openprompt', getOpenPrompt);

export default router;
