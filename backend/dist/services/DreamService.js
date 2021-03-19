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
const Helper_1 = __importDefault(require("../helpers/Helper"));
const DreamRepo_1 = __importDefault(require("../database/repositories/DreamRepo"));
const DreamTypeService_1 = __importDefault(require("./DreamTypeService"));
class DreamService {
    static createDream(dreamInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!moment_1.default(dreamInfo.date, "YYYY-MM-DD", true).isValid())
                return { "error message": "The date is not in the right format" };
            if (!DreamTypeService_1.default.isValidType(dreamInfo.type))
                return { "error message": "The dream type is not valid" };
            try {
                dreamInfo.type = DreamTypeService_1.default.getDreamTypeName(dreamInfo.type);
                let res = yield DreamRepo_1.default.createDream(dreamInfo);
                return res.ops[0];
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static getAllDreams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DreamRepo_1.default.getAllDreams();
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static findDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id))
                return { "error message": "id is not a number" };
            try {
                return yield DreamRepo_1.default.getDream(id);
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static updateDream(id, newDream) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id))
                return { "error message": "id is not a number" };
            newDream.type = DreamTypeService_1.default.getDreamTypeName(newDream.type);
            try {
                return yield DreamRepo_1.default.updateDream(id, newDream);
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static deleteDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id))
                return { "error message": "id is not a number" };
            try {
                return yield DreamRepo_1.default.deleteDream(id);
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    static search(title, type, dateFrom, dateTo, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            type = DreamTypeService_1.default.getDreamTypeName(type);
            try {
                let arr = yield DreamRepo_1.default.searchDreams(title, type, dateFrom, dateTo);
                let page_number = Number(page);
                let page_size = Number(pageSize);
                if (isNaN(page_number) || isNaN(page_size))
                    return arr;
                return Helper_1.default.paginate(arr, page_number, page_size);
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
}
exports.default = DreamService;
//# sourceMappingURL=DreamService.js.map