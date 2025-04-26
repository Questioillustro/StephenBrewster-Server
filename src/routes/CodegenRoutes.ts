import express from 'express';
import {saveCodeGen} from "../controllers/CodeGenController";

const router = express.Router();

router.post('/savecodegen', saveCodeGen);

export default router;
