"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Turista = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    godine: {
        type: Number
    },
    telefon: {
        type: Number
    },
    nocenje: {
        type: Number
    },
    lecenje: {
        type: Boolean
    },
    invaliditet: {
        type: Boolean
    },
    straniOslobodjen: {
        type: Boolean
    },
    objekat: {
        type: String
    },
    boravisnaTaksa: {
        type: Number
    },
    datum: {
        type: Date
    }
});
exports.default = mongoose_1.default.model('Turista', Turista, 'turisti');
//# sourceMappingURL=turista.js.map