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
const moment_1 = __importDefault(require("moment"));
const dream_1 = require("../database/models/dream");
const DreamRepo_1 = __importDefault(require("../database/repositories/DreamRepo"));
class DreamService {
    static getAllDreamTypes() {
        var values = Object.keys(dream_1.DreamType).filter(d => isNaN(Number(d)));
        return values;
    }
    static getDreamTypeName(index) {
        return DreamService.getAllDreamTypes()[index];
    }
    static createDream(dreamInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!moment_1.default(dreamInfo.date, "YYYY-MM-DD", true).isValid())
                return { "error message": "The date is not in the right format" };
            let arrDreamTypes = Array.from(Array(this.getAllDreamTypes().length).keys());
            if (!arrDreamTypes.includes(dreamInfo.type))
                return { "error message": "The type is not valid" };
            let res = yield DreamRepo_1.default.createDream(dreamInfo);
            return res.ops[0];
        });
    }
    static getAllDreams() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DreamRepo_1.default.getAllDreams();
        });
    }
    static findDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id))
                return { "error message": "id is not a number" };
            return yield DreamRepo_1.default.getDream(id);
        });
    }
    static updateDream(id, newDream) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id))
                return { "error message": "id is not a number" };
            newDream.type = this.getDreamTypeName(newDream.type);
            return yield DreamRepo_1.default.updateDream(id, newDream);
        });
    }
    static deleteDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id))
                return { "error message": "id is not a number" };
            return yield DreamRepo_1.default.deleteDream(id);
        });
    }
    static search(title, type, dateFrom, dateTo, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            type = this.getDreamTypeName(type);
            let arr = yield DreamRepo_1.default.searchDreams(title, type, dateFrom, dateTo, page);
            console.log(arr);
            let page_number = Number(page);
            let page_size = Number(pageSize);
            return arr.slice((page_number - 1) * page_size, page_number * page_size);
        });
    }
}
exports.default = DreamService;
//# sourceMappingURL=DreamService.js.map