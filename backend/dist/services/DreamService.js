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
const dream_1 = require("../database/models/dream");
const DreamRepo_1 = __importDefault(require("../database/repositories/DreamRepo"));
class DreamService {
    static getAllDreamTypes() {
        var values = Object.keys(dream_1.DreamType).filter(d => isNaN(Number(d)));
        //console.log(values)
        return values;
    }
    static getDreamTypeName(index) {
        return DreamService.getAllDreamTypes()[index];
    }
    static createDream(dreamInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield DreamRepo_1.default.createDream(dreamInfo);
            return res.ops[0];
        });
    }
}
exports.default = DreamService;
//# sourceMappingURL=DreamService.js.map