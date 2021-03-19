"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const DreamService_1 = __importDefault(require("../services/DreamService"));
const pino = require('pino');
const logger = pino();
router.route('/').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dreamInfo = req.body.dream;
    res.json(yield DreamService_1.default.createDream(dreamInfo));
}));
router.route('/').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield DreamService_1.default.getAllDreams());
}));
router.route('/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    res.json(yield DreamService_1.default.findDream(Number(id)));
}));
router.route('/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let dream = req.body.dream;
    res.json(yield DreamService_1.default.updateDream(Number(id), dream));
}));
router.route('/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    res.json(yield DreamService_1.default.deleteDream(Number(id)));
}));
module.exports = router;
//# sourceMappingURL=DreamRoutes.js.map