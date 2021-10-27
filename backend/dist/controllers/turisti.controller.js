"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuristaController = void 0;
const turista_1 = __importDefault(require("../models/turista"));
const objekat_1 = __importDefault(require("../models/objekat"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
class TuristaController {
    constructor() {
        this.unosTuriste = (req, res) => {
            let turista = new turista_1.default(req.body);
            turista.save().then((tur) => {
                objekat_1.default.findOne({ 'naziv': req.body.objekat }, (err, objekat) => {
                    if (err)
                        console.log(err);
                    else {
                        korisnik_1.default.findOne({ "username": objekat.username }, function (err, korisnik) {
                            if (err)
                                console.log(err);
                            else {
                                console.log(korisnik.username + " " + korisnik.boravisnaTaksa);
                                korisnik.boravisnaTaksa = korisnik.boravisnaTaksa != undefined ? korisnik.boravisnaTaksa + req.body.boravisnaTaksa : req.body.boravisnaTaksa;
                                console.log(korisnik.username + "**" + korisnik.boravisnaTaksa);
                                korisnik.save().then((kor) => {
                                    console.log(kor);
                                    return res.json(tur);
                                }).catch(err => {
                                    res.json(err);
                                });
                            }
                        });
                    }
                });
            }).catch(err => {
                res.json(err);
            });
        };
        this.dohvatiTuristeOvlascenogKorisnika = (req, res) => {
            let naziviObjekata = [];
            objekat_1.default.find({ 'ovlasceni': { "$in": [req.body.ovlasceni] } }, (err, objekti) => {
                if (err)
                    console.log(err);
                else {
                    for (let i = 0; i < objekti.length; i++) {
                        naziviObjekata.push(objekti[i].get("naziv"));
                    }
                    turista_1.default.find({ 'objekat': { $in: naziviObjekata } }, (err, zahtevi) => {
                        if (err)
                            console.log(err);
                        else {
                            return res.json(zahtevi);
                        }
                    });
                }
            });
        };
        this.izmeniTuristu = (req, res) => {
            turista_1.default.findOneAndUpdate({ "ime": req.body.oldIme, "prezime": req.body.oldPrezime }, {
                "$set": {
                    "ime": req.body.ime,
                    "prezime": req.body.prezime,
                    "godine": req.body.godine,
                    "telefon": req.body.telefon,
                    "nocenje": req.body.nocenje,
                    "lecenje": req.body.lecenje,
                    "invaliditet": req.body.invaliditet,
                    "straniOslobodjen": req.body.straniOslobodjen,
                    "objekat": req.body.objekat,
                    "boravisnaTaksa": req.body.boravisnaTaksa,
                    "datum": req.body.datum
                }
            }, { new: true }).exec(function (err, tur) {
                if (err) {
                    return res.json(err);
                }
                else {
                    objekat_1.default.findOne({ 'naziv': req.body.objekat }, (err, objekat) => {
                        if (err)
                            console.log(err);
                        else {
                            korisnik_1.default.findOne({ "username": objekat.username }, function (err, korisnik) {
                                if (err)
                                    console.log(err);
                                else {
                                    console.log(korisnik.username + " " + korisnik.boravisnaTaksa);
                                    korisnik.boravisnaTaksa = korisnik.boravisnaTaksa != undefined ? korisnik.boravisnaTaksa + req.body.boravisnaTaksa - req.body.oldBoravisnaTaksa : req.body.boravisnaTaksa - req.body.oldBoravisnaTaksa;
                                    console.log(korisnik.username + "**" + korisnik.boravisnaTaksa);
                                    korisnik.save().then((kor) => {
                                        console.log(kor);
                                        return res.json(tur);
                                    }).catch(err => {
                                        res.json(err);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
        this.ukloniTuristu = (req, res) => {
            turista_1.default.deleteOne({ "ime": req.body.ime, "prezime": req.body.prezime, "telefon": req.body.telefon }).then(tur => {
                if (tur) {
                    return res.json({ "message": "obrisano" });
                }
                else {
                    return res.json({ "message": "greska" });
                }
            });
        };
    }
}
exports.TuristaController = TuristaController;
//# sourceMappingURL=turisti.controller.js.map