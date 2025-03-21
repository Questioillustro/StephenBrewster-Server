import express from 'express';
import { generateImage } from '../controllers/ImageController';
const rateLimit = require('express-rate-limit');

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Max 10 requests per IP
  message: { error: 'Too many requests, please try again later.' },
});

router.post('/generateimages/:id/:index', limiter, generateImage);

export default router;
