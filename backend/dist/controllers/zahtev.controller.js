"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevController = void 0;
const zahtev_1 = __importDefault(require("../models/zahtev"));
const objekat_1 = __importDefault(require("../models/objekat"));
class ZahtevController {
    constructor() {
        this.unosZahtevaZaKategorizaciju = (req, res) => {
            let zahtev = new zahtev_1.default(req.body);
            zahtev.save().then((kor) => {
                objekat_1.default.findOneAndUpdate({ "username": req.body.username, "naziv": req.body.naziv }, {
                    $set: { "poslatZahtev": true }
                }).exec(function (err, objekat) {
                    if (err) {
                        return res.json(err);
                    }
                    else {
                        res.json({ 'message': 'Uspesan unos' });
                    }
                });
            }).catch(err => {
                res.json(err);
            });
        };
        this.dohvatiZahtevZaKategorizaciju = (req, res) => {
            zahtev_1.default.findOne({ 'username': req.body.username, 'naziv': req.body.naziv }, (err, zahtev) => {
                if (err)
                    console.log(err);
                else {
                    res.json(zahtev);
                }
            });
        };
        this.dohvatiZahteveOvlascenogKorisnika = (req, res) => {
            let naziviObjekata = [];
            objekat_1.default.find({ 'ovlasceni': { "$in": [req.body.ovlasceni] } }, (err, objekti) => {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < objekti.length; i++) {
                        console.log(objekti[i].get("naziv"));
                        naziviObjekata.push(objekti[i].get("naziv"));
                    }
                    zahtev_1.default.find({ 'naziv': { $in: naziviObjekata } }, (err, zahtevi) => {
                        if (err)
                            console.log(err);
                        else {
                            return res.json(zahtevi);
                        }
                    });
                }
            });
        };
        this.dohvatiSveZahteveZaKategorizaciju = (req, res) => {
            zahtev_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.kategorisiObjekat = (req, res) => {
            objekat_1.default.findOneAndUpdate({ "naziv": req.body.naziv }, {
                $set: { "zvezdice": req.body.zvezdice, "kategorizovan": true }
            }).exec(function (err, objekat) {
                if (err) {
                    return res.json(err);
                }
                else {
                    zahtev_1.default.deleteOne({ "naziv": req.body.naziv }).then(zah => {
                        if (zah) {
                            return res.json({ "message": "obrisano" });
                        }
                        else {
                            return res.json({ "message": "greska" });
                        }
                    });
                }
            });
        };
    }
}
exports.ZahtevController = ZahtevController;
//# sourceMappingURL=zahtev.controller.js.map