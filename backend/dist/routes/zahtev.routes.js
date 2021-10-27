"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const zahtev_controller_1 = require("../controllers/zahtev.controller");
const zahtevRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/docs");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
zahtevRouter.route('/unosZahtevaZaKategorizaciju').post(upload.single("file"), (req, res) => {
    req.body.formular = "http://localhost:4000/docs/" + req.file.filename;
    new zahtev_controller_1.ZahtevController().unosZahtevaZaKategorizaciju(req, res);
});
zahtevRouter.route('/dohvatiZahtevZaKategorizaciju').post((req, res) => new zahtev_controller_1.ZahtevController().dohvatiZahtevZaKategorizaciju(req, res));
zahtevRouter.route('/dohvatiZahteveOvlascenogKorisnika').post((req, res) => new zahtev_controller_1.ZahtevController().dohvatiZahteveOvlascenogKorisnika(req, res));
zahtevRouter.route('/dohvatiSveZahteveZaKategorizaciju').get((req, res) => new zahtev_controller_1.ZahtevController().dohvatiSveZahteveZaKategorizaciju(req, res));
zahtevRouter.route('/kategorisiObjekat').post((req, res) => new zahtev_controller_1.ZahtevController().kategorisiObjekat(req, res));
exports.default = zahtevRouter;
//# sourceMappingURL=zahtev.routes.js.map