"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const DreamService_1 = __importDefault(require("../services/DreamService"));
router.route('/types').get((req, res) => {
    let result = DreamService_1.default.getAllDreamTypes();
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=DreamTypeRoutes.js.map