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
const Helper_1 = __importDefault(require("../../helpers/Helper"));
const dream_1 = __importDefault(require("../models/dream"));
//import Promise from 'promise'
class DreamRepo {
    static findLastId() {
        return __awaiter(this, void 0, void 0, function* () {
            let lastId = 1;
            let lastEl = yield dream_1.default.find().sort({ "id": -1 }).limit(1);
            if (lastEl.length > 0)
                lastId = lastEl[0].get('id') + 1;
            return lastId;
        });
    }
    static createDream(dreamInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var obj = { id: yield this.findLastId(), title: dreamInfo.title, description: dreamInfo.description, date: dreamInfo.date, type: dreamInfo.type };
            let newDream = new dream_1.default(obj);
            return yield dream_1.default.collection.insertOne(newDream);
        });
    }
    static getAllDreams() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dream_1.default.find().exec();
        });
    }
    static getDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dream_1.default.findOne({ "id": id }).exec();
        });
    }
    static updateDream(id, newDream) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dream_1.default.findOneAndUpdate({ "id": id }, newDream, { new: true }).exec();
        });
    }
    static deleteDream(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dream_1.default.findOneAndDelete({ "id": id });
        });
    }
    static searchDreams(title, type, dateFrom, dateTo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title == "" || title == undefined)
                title = { $exists: true };
            if (type == "" || type == undefined)
                type = { $exists: true };
            let dateComparison = Helper_1.default.transforDateRange(dateFrom, dateTo);
            return yield dream_1.default.collection.aggregate([
                { "$addFields": {
                        "date2": {
                            "$dateFromString": {
                                "dateString": "$date"
                            }
                        }
                    } },
                { "$match": { $and: [
                            { "date2": dateComparison },
                            { "title": title },
                            { "type": type }
                        ] } }
            ]).toArray();
        });
    }
}
exports.default = DreamRepo;
//# sourceMappingURL=DreamRepo.js.map