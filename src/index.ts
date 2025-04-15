import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db';
import logger from './config/logger';
import storyRoutes from './routes/StoryRoutes';
import cors from 'cors';
import adventureRoutes from './routes/AdventureRoutes';
import quickAdventureRoutes from './routes/QuickAdventureRoutes';
import imagesRoutes from './routes/ImagesRoutes';
import bodyParser from 'body-parser';
import openPromptRoutes from "./routes/OpenPromptRoutes";
import grokModelRoutes from "./routes/GrokModels";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

logger.info(`env port is: ${process.env.PORT}`);
logger.info(`using port: ${port}`);

connectDb();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the adventure time application with your AI story teller, Tim');
  logger.info(`Root accessed at ${new Date().toLocaleString('en-us')}. From IP: ${req.ip}`);
});

app.use(express.json());

app.use('/api', storyRoutes);
app.use('/api', adventureRoutes);
app.use('/api', quickAdventureRoutes);
app.use('/api', imagesRoutes);
app.use('/api', openPromptRoutes);
app.use('/api', grokModelRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  logger.info(`Server is Fire at port ${port}`);
});
