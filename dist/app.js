"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./app/routes");
const globalErrorHandellar_1 = require("./app/middleware/globalErrorHandellar");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", routes_1.router);
app.get('/', (req, res) => {
    res.send("Wellcome to Ride Booking System");
});
app.use(globalErrorHandellar_1.globalErrorHandeller);
app.use(notFound_1.default);
exports.default = app;
