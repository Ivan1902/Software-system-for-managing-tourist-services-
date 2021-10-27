"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proizvod_controller_1 = require("../controllers/proizvod.controller");
const proizvodiRouter = express_1.default.Router();
proizvodiRouter.route('/dohvatiSveProizvodeKojihImaNaStanju').get((req, res) => new proizvod_controller_1.ProizvodController().dohvatiSveProizvodeKojihImaNaStanju(req, res));
proizvodiRouter.route('/dohvatiSveProizvode').get((req, res) => new proizvod_controller_1.ProizvodController().dohvatiSveProizvode(req, res));
proizvodiRouter.route('/kupiProizvod').post((req, res) => new proizvod_controller_1.ProizvodController().kupiProizvod(req, res));
proizvodiRouter.route('/oceniProizvod').post((req, res) => new proizvod_controller_1.ProizvodController().oceniProizvod(req, res));
proizvodiRouter.route('/dodajProizvod').post((req, res) => new proizvod_controller_1.ProizvodController().dodajProizvod(req, res));
proizvodiRouter.route('/ukloniProizvod').post((req, res) => new proizvod_controller_1.ProizvodController().ukloniProizvod(req, res));
exports.default = proizvodiRouter;
//# sourceMappingURL=proizvod.routes.js.map