import express from 'express';
import { generateImage } from '../controllers/ImageController';

const router = express.Router();

router.post('/generateimages/:id/:index', generateImage);

export default router;
