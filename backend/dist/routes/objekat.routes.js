"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const objekat_controller_1 = require("../controllers/objekat.controller");
const objekatRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
objekatRouter.route('/unesiUgostiteljskiObjekat').post(upload.array("files"), (req, res) => {
    const files = req.files;
    let slike;
    slike = [];
    if (Array.isArray(files) && files.length > 0) {
        for (let index = 0; index < files.length; index++) {
            slike.push("http://localhost:4000/uploads/" + files[index].filename);
        }
    }
    else {
        res.json({ 'message': 'Neuspesan unos' });
    }
    req.body.slike = slike;
    console.log(slike);
    new objekat_controller_1.ObjekatController().unosUgostiteljskogObjekta(req, res);
});
objekatRouter.route('/pretraziUgostiteljskeObjekte').post((req, res) => new objekat_controller_1.ObjekatController().pretraziUgostiteljskeObjekte(req, res));
objekatRouter.route('/izmeniUgostiteljskiObjekat').post(upload.array("files"), (req, res) => {
    const files = req.files;
    let slike;
    slike = [];
    let stareSlike;
    stareSlike = req.body.slike.split(",");
    console.log(stareSlike[0] != '');
    if (stareSlike[0] != '') {
        for (let index = 0; index < stareSlike.length; index++) {
            console.log('ete me');
            slike.push(stareSlike[index]);
        }
    }
    if (Array.isArray(files) && files.length > 0) {
        for (let index = 0; index < files.length; index++) {
            slike.push("http://localhost:4000/uploads/" + files[index].filename);
        }
    }
    console.log(slike);
    req.body.slike = slike;
    new objekat_controller_1.ObjekatController().izmeniUgostiteljskiObjekat(req, res);
});
objekatRouter.route('/dohvatiMojeNekategorisaneObjekte').post((req, res) => new objekat_controller_1.ObjekatController().dohvatiMojeNekategorisaneObjekte(req, res));
objekatRouter.route('/dohvatiObjekteOvlascenog').post((req, res) => new objekat_controller_1.ObjekatController().dohvatiObjekteOvlascenog(req, res));
objekatRouter.route('/ukloniObjekat').post((req, res) => new objekat_controller_1.ObjekatController().ukloniObjekat(req, res));
exports.default = objekatRouter;
//# sourceMappingURL=objekat.routes.js.map