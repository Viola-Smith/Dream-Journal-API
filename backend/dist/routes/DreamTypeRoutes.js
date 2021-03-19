"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DreamTypeService_1 = __importDefault(require("../services/DreamTypeService"));
const router = express_1.default.Router();
router.route('/types').get((req, res) => {
    let result = DreamTypeService_1.default.getAllDreamTypes();
    res.json(result);
});
module.exports = router;
//# sourceMappingURL=DreamTypeRoutes.js.map