import express from 'express';
import {getAllCodeGen, saveCodeGen} from "../controllers/CodeGenController";

const router = express.Router();

router.post('/savecodegen', saveCodeGen);

router.get('/codegen', getAllCodeGen);

export default router;
