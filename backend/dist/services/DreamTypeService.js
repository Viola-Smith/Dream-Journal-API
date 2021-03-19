"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dream_1 = require("../database/models/dream");
class DreamTypeService {
    static getAllDreamTypes() {
        var values = Object.keys(dream_1.DreamType).filter(d => isNaN(Number(d)));
        return values;
    }
    static getDreamTypeName(index) {
        return this.getAllDreamTypes()[index];
    }
    static isValidType(num) {
        let arrDreamTypes = Array.from(Array(DreamTypeService.getAllDreamTypes().length).keys());
        return arrDreamTypes.includes(num);
    }
}
exports.default = DreamTypeService;
//# sourceMappingURL=DreamTypeService.js.map