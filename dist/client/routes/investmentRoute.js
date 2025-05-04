"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Investment_1 = __importDefault(require("../models/Investment"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const newInvestment = new Investment_1.default(req.body);
        await newInvestment.save();
        res.status(201).json({ message: 'Investment saved successfully' });
    }
    catch (err) {
        console.error('❌ Error saving investment:', err);
        res.status(500).json({ error: 'Failed to save investment' });
    }
});
exports.default = router;
