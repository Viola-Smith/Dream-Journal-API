"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DreamType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var DreamType;
(function (DreamType) {
    DreamType[DreamType["happy"] = 0] = "happy";
    DreamType[DreamType["sad"] = 1] = "sad";
    DreamType[DreamType["exciting"] = 2] = "exciting";
    DreamType[DreamType["scary"] = 3] = "scary";
})(DreamType = exports.DreamType || (exports.DreamType = {}));
let Dream = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: String
    },
    type: {
        type: DreamType,
    }
}, { collection: "Dream" });
exports.default = mongoose_1.default.model('Dream', Dream);
//# sourceMappingURL=dream.js.map