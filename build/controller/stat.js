"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statRouter = void 0;
const express_1 = __importDefault(require("express"));
const stat_generator_helper_1 = require("../service/stat-generator-helper");
const statRouter = express_1.default.Router();
exports.statRouter = statRouter;
statRouter.get('/', (req, res) => {
    const { probability, value, iterations } = req.query;
    // TODO Extract logic to reposity if DB appears
    const statGenerator = new stat_generator_helper_1.StatisticGenerator(probability, value, iterations);
    const statistics = statGenerator.generateProbabilityStat();
    res.send(statistics);
});
