"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjekatController = void 0;
const objekat_1 = __importDefault(require("../models/objekat"));
const turista_1 = __importDefault(require("../models/turista"));
class ObjekatController {
    constructor() {
        this.unosUgostiteljskogObjekta = (req, res) => {
            let objekat = new objekat_1.default(req.body);
            objekat.save().then((kor) => {
                res.json({ 'message': 'Uspesan unos' });
            }).catch(err => {
                res.json(err);
            });
        };
        this.pretraziUgostiteljskeObjekte = (req, res) => {
            objekat_1.default.find({ 'naziv': new RegExp(req.body.naziv ? req.body.naziv : /.*/, "i"), 'grad': new RegExp(req.body.grad ? req.body.grad : /.*/, "i"), 'adresa': new RegExp(req.body.adresa ? req.body.adresa : /.*/, "i") }, (err, objekti) => {
                if (err)
                    console.log(err);
                else {
                    res.json(objekti);
                }
            });
        };
        this.izmeniUgostiteljskiObjekat = (req, res) => {
            objekat_1.default.findOneAndUpdate({ "username": req.body.oldUsername, "naziv": req.body.oldNaziv }, {
                "$set": {
                    "username": req.body.username,
                    "naziv": req.body.naziv,
                    "adresa": req.body.adresa,
                    "grad": req.body.grad,
                    "opis": req.body.opis,
                    "slike": req.body.slike,
                    "kategorizovan": req.body.kategorizovan,
                    "vrsta": req.body.vrsta,
                    "poslatZahtev": req.body.poslatZahtev,
                    "ovlasceni": req.body.ovlasceni
                }
            }, { new: true }).exec(function (err, objekat) {
                if (err) {
                    return res.json(err);
                }
                else {
                    return res.json(objekat);
                }
            });
        };
        this.dohvatiMojeNekategorisaneObjekte = (req, res) => {
            objekat_1.default.find({ 'username': req.body.username, 'kategorizovan': false }, (err, objekti) => {
                if (err)
                    console.log(err);
                else {
                    res.json(objekti);
                }
            });
        };
        this.dohvatiObjekteOvlascenog = (req, res) => {
            objekat_1.default.find({ 'ovlasceni': { "$in": [req.body.ovlasceni] } }, (err, objekti) => {
                if (err)
                    console.log(err);
                else {
                    return res.json(objekti);
                }
            });
        };
        this.ukloniObjekat = (req, res) => {
            turista_1.default.findOne({ 'objekat': req.body.naziv }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    if (kor) {
                        res.json({ 'message': 'Postoji evidentirani turista' });
                    }
                    else {
                        objekat_1.default.deleteOne({ 'naziv': req.body.naziv }, (err) => {
                            if (err) {
                                res.json({ 'message': 'Objekat ne postoji u sistemu' });
                            }
                            else {
                                res.json({ 'message': 'Objekat uspesno uklonjen' });
                            }
                        });
                    }
                }
            });
        };
    }
}
exports.ObjekatController = ObjekatController;
//# sourceMappingURL=objekat.controller.js.map