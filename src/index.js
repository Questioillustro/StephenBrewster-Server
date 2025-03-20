"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./config/logger"));
const StoryRoutes_1 = __importDefault(require("./routes/StoryRoutes"));
const cors_1 = __importDefault(require("cors"));
const AdventureRoutes_1 = __importDefault(require("./routes/AdventureRoutes"));
const QuickAdventureRoutes_1 = __importDefault(require("./routes/QuickAdventureRoutes"));
const ImagesRoutes_1 = __importDefault(require("./routes/ImagesRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 8000;
logger_1.default.info(`env port is: ${process.env.SERVER_PORT}`);
logger_1.default.info(`using port: ${port}`);
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.get('/', (req, res) => {
    res.send('Welcome to the adventure time application with your AI story teller, Tim');
    logger_1.default.info(`Root accessed at ${new Date().toLocaleString('en-us')}. From IP: ${req.ip}`);
});
app.use(express_1.default.json());
app.use('/api', StoryRoutes_1.default);
app.use('/api', AdventureRoutes_1.default);
app.use('/api', QuickAdventureRoutes_1.default);
app.use('/api', ImagesRoutes_1.default);
app.listen(port, () => {
    logger_1.default.info(`Server is Fire at http://localhost:${port}`);
});
