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
Object.defineProperty(exports, "__esModule", { value: true });
const dream_1 = require("../database/models/dream");
class UserService {
    static login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static getAllDreamTypes() {
        var values = Object.keys(dream_1.DreamType).filter(d => isNaN(Number(d)));
        //console.log(values)
        return values;
    }
}
exports.default = UserService;
//# sourceMappingURL=DreamService.js.map