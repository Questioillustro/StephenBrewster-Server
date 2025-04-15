import express from "express";
import {getModels} from "../controllers/GrokModelsController";

const router = express.Router();

router.get('/getGrokModels', getModels);

export default router;