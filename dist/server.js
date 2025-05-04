"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./client/models/db");
const investmentRoute_1 = __importDefault(require("./client/routes/investmentRoute"));
const app = (0, express_1.default)();
const PORT = 3000;
(0, db_1.connectToDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/investments', investmentRoute_1.default);
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
