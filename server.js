"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var db_1 = require("./models/db");
var investmentRoute_1 = require("./routes/investmentRoute");
var app = (0, express_1.default)();
var PORT = 3000;
(0, db_1.connectToDB)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/investments', investmentRoute_1.default);
app.listen(PORT, function () {
    console.log("\u2705 Server is running on http://localhost:".concat(PORT));
});
