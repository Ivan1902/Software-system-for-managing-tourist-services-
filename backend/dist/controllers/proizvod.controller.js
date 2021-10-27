"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProizvodController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const proizvod_1 = __importDefault(require("../models/proizvod"));
class ProizvodController {
    constructor() {
        this.dohvatiSveProizvodeKojihImaNaStanju = (req, res) => {
            proizvod_1.default.find({ 'kolicina': { $gt: 0 } }, (err, proizvodi) => {
                if (err)
                    console.log(err);
                else
                    res.json(proizvodi);
            });
        };
        this.dohvatiSveProizvode = (req, res) => {
            proizvod_1.default.find({}, (err, proizvodi) => {
                if (err)
                    console.log(err);
                else
                    res.json(proizvodi);
            });
        };
        this.dodajProizvod = (req, res) => {
            let naziv = req.body.naziv;
            proizvod_1.default.collection.updateOne({ 'naziv': naziv }, { $inc: { 'kolicina': 1 } });
            res.json({ poruka: 'ok' });
        };
        this.ukloniProizvod = (req, res) => {
            let naziv = req.body.naziv;
            proizvod_1.default.collection.updateOne({ 'naziv': naziv }, { $inc: { 'kolicina': -1 } });
            res.json({ poruka: 'ok' });
        };
        this.kupiProizvod = (req, res) => {
            let naziv = req.body.naziv;
            let kor_ime = req.body.kor_ime;
            //console.log(naziv);
            //console.log(kor_ime);
            proizvod_1.default.collection.updateOne({ 'naziv': naziv }, { $inc: { 'kolicina': -1 } });
            korisnik_1.default.findOne({ 'kor_ime': kor_ime, 'proizvodi.naziv': naziv }, (err, korisnikJeKupovaoProizvod) => {
                if (err)
                    console.log(err);
                else {
                    if (korisnikJeKupovaoProizvod) {
                        //updejt kolicina
                        korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime, 'proizvodi.naziv': naziv }, { $inc: { 'proizvodi.$.kolicina': 1 } });
                    }
                    else {
                        //dodaj novi objekat
                        let kupovina = {
                            naziv: naziv,
                            kolicina: 1
                        };
                        korisnik_1.default.collection.updateOne({ 'kor_ime': kor_ime }, { $push: { "proizvodi": kupovina } });
                    }
                    res.json({ poruka: 'ok' });
                }
            });
        };
        this.oceniProizvod = (req, res) => {
            let naziv = req.body.naziv;
            let ocena = req.body.ocena;
            let ocenaObj = {
                ocena: ocena
            };
            proizvod_1.default.collection.updateOne({ 'naziv': naziv }, { $push: { 'ocene': ocenaObj } });
            res.json({ poruka: 'ok' });
        };
    }
}
exports.ProizvodController = ProizvodController;
//# sourceMappingURL=proizvod.controller.js.map