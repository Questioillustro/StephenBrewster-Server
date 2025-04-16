import express from 'express';
import {getAll} from '../controllers/AdventureController';

const router = express.Router();

router.get('/adventures', getAll);

export default router;
