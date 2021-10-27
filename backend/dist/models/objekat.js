"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Objekat = new Schema({
    naziv: {
        type: String
    },
    adresa: {
        type: String
    },
    grad: {
        type: String
    },
    opis: {
        type: String
    },
    slike: {
        type: Array
    },
    username: {
        type: String
    },
    kategorizovan: {
        type: Boolean
    },
    vrsta: {
        type: String
    },
    poslatZahtev: {
        type: Boolean
    },
    ovlasceni: {
        type: Array
    },
    zvezdice: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Objekat', Objekat, 'objekti');
//# sourceMappingURL=objekat.js.map