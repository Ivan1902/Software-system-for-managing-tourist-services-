"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const turisti_controller_1 = require("../controllers/turisti.controller");
const turistaRouter = express_1.default.Router();
turistaRouter.route('/unosTuriste').post((req, res) => new turisti_controller_1.TuristaController().unosTuriste(req, res));
turistaRouter.route('/dohvatiTuristeOvlascenogKorisnika').post((req, res) => new turisti_controller_1.TuristaController().dohvatiTuristeOvlascenogKorisnika(req, res));
turistaRouter.route('/izmeniTuristu').post((req, res) => new turisti_controller_1.TuristaController().izmeniTuristu(req, res));
turistaRouter.route('/ukloniTuristu').post((req, res) => new turisti_controller_1.TuristaController().ukloniTuristu(req, res));
exports.default = turistaRouter;
//# sourceMappingURL=turista.routes.js.map