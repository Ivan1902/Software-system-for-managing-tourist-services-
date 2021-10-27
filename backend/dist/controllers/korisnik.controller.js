"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const objekat_1 = __importDefault(require("../models/objekat"));
class KorisnikController {
    constructor() {
        this.login = (req, res) => {
            korisnik_1.default.findOne({ 'username': req.body.username }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user) {
                        korisnik_1.default.findOne({ 'username': req.body.username, 'password': req.body.password }, (err, korisnik) => {
                            if (err)
                                console.log(err);
                            else {
                                if (korisnik) {
                                    res.json({ 'message': 'ok', 'korisnik': korisnik });
                                }
                                else {
                                    res.json({ 'message': 'Neispravna lozinka!', 'korisnik': undefined });
                                }
                            }
                        });
                    }
                    else {
                        res.json({ 'message': 'Korisnik sa takvim korisnickim imenom ne postoji u sistemu!', 'korisnik': undefined });
                    }
                }
            });
        };
        this.dohvatiUgostitelje = (req, res) => {
            korisnik_1.default.find({ 'tip': { "$nin": ['admin', 'ovlasceni'] } }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.dohvatiSveKorisnike = (req, res) => {
            korisnik_1.default.find({ 'tip': { "$ne": 'admin' } }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.dohvatiOvlascene = (req, res) => {
            korisnik_1.default.find({ 'tip': 'ovlasceni' }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.dodajUgostitelja = (req, res) => {
            let korisnik = new korisnik_1.default(req.body);
            korisnik_1.default.findOne({ 'username': req.body.username }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    if (kor) {
                        res.json({ 'message': 'Ugostitelj vec postoji u sistemu' });
                    }
                    else {
                        korisnik.save().then((kor) => {
                            res.json({ 'message': 'Uspesan unos' });
                        }).catch(err => {
                            res.json(err);
                        });
                    }
                }
            });
        };
        this.ukloniKorisnika = (req, res) => {
            objekat_1.default.findOne({ 'username': req.body.username }, (err, kor) => {
                if (err)
                    console.log(err);
                else {
                    if (kor) {
                        res.json({ 'message': 'Korisnik je vlasnik nekog ugostiteljskog objekta' });
                    }
                    else {
                        korisnik_1.default.deleteOne({ 'username': req.body.username }, (err) => {
                            if (err) {
                                res.json({ 'message': 'Ugostitelj ne postoji u sistemu' });
                            }
                            else {
                                res.json({ 'message': 'Korisnik uspesno uklonjen' });
                            }
                        });
                    }
                }
            });
        };
        this.izmeniKorisnika = (req, res) => {
            korisnik_1.default.findOneAndUpdate({ "username": req.body.oldUsername }, {
                "$set": {
                    "ime": req.body.ime,
                    "prezime": req.body.prezime,
                    "username": req.body.username,
                    "password": req.body.password,
                    "tip": req.body.tip,
                    "brTelefona": req.body.brTelefona,
                    "boravisnaTaksa": req.body.boravisnaTaksa,
                    "registrovan": req.body.registrovan
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
        this.uplacenaBoravisnaTaksa = (req, res) => {
            korisnik_1.default.collection.updateOne({ 'username': req.body.username }, { $inc: { 'boravisnaTaksa': -req.body.uplaceno } });
            res.json({ poruka: 'ok' });
        };
        this.dohvatiKorisnika = (req, res) => {
            let username = req.body.username;
            korisnik_1.default.findOne({ 'username': username }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map