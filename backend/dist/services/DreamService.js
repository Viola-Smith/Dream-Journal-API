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
const pino = require('pino');
const logger = pino({
    level: 'debug'
});
class DreamService {
    static createDream(dreamInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!moment_1.default(dreamInfo.date, "YYYY-MM-DD", true).isValid()) {
                logger.error(new Error("Create query failed"), "The date is not in right format");
                return { "error message": "The date is not in the right format" };
            }
            if (!DreamTypeService_1.default.isValidType(dreamInfo.type)) {
                logger.error(new Error("Create query failed"), "The dream type is not valid");
                return { "error message": "The dream type is not valid" };
            }
            try {
                dreamInfo.type = DreamTypeService_1.default.getDreamTypeName(dreamInfo.type);
                let res = yield DreamRepo_1.default.createDream(dreamInfo);
                logger.info('Created a dream with id ' + res.ops[0].id);
                return res.ops[0];
            }
            catch (err) {
                logger.error(new Error("Create query failed"), err);
                return { "error message": err };
            }
        });
    }
    static getAllDreams() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dreams = yield DreamRepo_1.default.getAllDreams();
                logger.info('Got all dreams');
                return dreams;
            }
            catch (err) {
                logger.error(new Error("Get all dreams failed"), err);
                return { "error message": err };
            }
        });
    }
    static findDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                logger.error(new Error("Get a dream failed"), "Id was not a number");
                return { "error message": "Id was not a number" };
            }
            try {
                let dream = yield DreamRepo_1.default.getDream(id);
                logger.info('Got a dream with id ' + id);
                return dream;
            }
            catch (err) {
                logger.error(new Error("Get a dream failed with id " + id), err);
                return { "error message": err };
            }
        });
    }
    static updateDream(id, newDream) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                logger.error(new Error("Update a dream failed"), "Id was not a number");
                return { "error message": "Id was not a number" };
            }
            newDream.type = DreamTypeService_1.default.getDreamTypeName(newDream.type);
            try {
                let updatedDream = yield DreamRepo_1.default.updateDream(id, newDream);
                logger.info('Updated a dream with id ' + id);
                return updatedDream;
            }
            catch (err) {
                logger.error(new Error("Update a dream failed with id " + id), err);
                return { "error message": err };
            }
        });
    }
    static deleteDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (isNaN(id)) {
                logger.error(new Error("Delete a dream failed"), "Id was not a number");
                return { "error message": "Id was not a number" };
            }
            try {
                let deletedDream = yield DreamRepo_1.default.deleteDream(id);
                logger.info('Deleted a dream with id ' + id);
                return deletedDream;
            }
            catch (err) {
                logger.error(new Error("Delete a dream failed with id " + id), err);
                return { "error message": err };
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
                logger.info('Searched for dreams');
                logger.debug('Searched with parameters: title = ' + title + ', type= ' + type + ', date1= ' + dateFrom + ', date2=' + dateTo
                    + ' , page number = ' + page_number + ', page size = ' + page_size);
                if (isNaN(page_number) || isNaN(page_size))
                    return arr;
                return Helper_1.default.paginate(arr, page_number, page_size);
            }
            catch (err) {
                logger.error(new Error("Search dreams failed"), err);
                return { "error message": err };
            }
        });
    }
}
exports.default = DreamService;
//# sourceMappingURL=DreamService.js.map