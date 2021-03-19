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
const DreamService_1 = __importDefault(require("../../services/DreamService"));
const dream_1 = __importDefault(require("../models/dream"));
//import Promise from 'promise'
class DreamRepo {
    static findLastId() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dream_1.default.find({}, (err, dreams) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    console.log(err);
            })).sort({ "id": -1 }).limit(1);
        });
    }
    static createDream(dreamInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            var obj = { id: 0, title: dreamInfo.title, description: dreamInfo.description, date: dreamInfo.date, type: dreamInfo.type };
            obj.type = DreamService_1.default.getDreamTypeName(obj.type);
            let lastId = 1;
            let lastEl = yield DreamRepo.findLastId();
            if (lastEl.length > 0)
                lastId = lastEl[0].get('id') + 1;
            obj.id = lastId;
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
    static transforDateRange(dateFrom, dateTo) {
        if (dateFrom == "" || dateFrom == undefined) {
            if (dateTo == "" || dateTo == undefined)
                return { $exists: true };
            else
                return { "$lt": new Date(dateTo) };
        }
        else {
            if (dateTo == "" || dateTo == undefined)
                return { "$gte": new Date(dateFrom) };
            else
                return { "$gte": new Date(dateFrom), "$lt": new Date(dateTo) };
        }
    }
    static searchDreams(title, type, dateFrom, dateTo, page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (title == "" || title == undefined)
                title = { $exists: true };
            if (type == "" || type == undefined)
                type = { $exists: true };
            let dateComparison = this.transforDateRange(dateFrom, dateTo);
            if (page == undefined || page == "" || isNaN(Number(page)))
                page = 1;
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