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
router.route('/').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let title = req.query.title;
    let type = req.query.type;
    let dateFrom = req.query.date1;
    let dateTo = req.query.date2;
    let page = req.query.page;
    let pageSize = req.query.size;
    res.json(yield DreamService_1.default.search(title, type, dateFrom, dateTo, page, pageSize));
}));
module.exports = router;
//# sourceMappingURL=DreamSearchRoutes.js.map