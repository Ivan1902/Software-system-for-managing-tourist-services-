import express from 'express';
import Zahtev from '../models/zahtev';
import Turista from '../models/turista';
import Objekat from '../models/objekat';
import Korisnik from '../models/korisnik';



export class TuristaController {
    unosTuriste = (req: express.Request, res: express.Response)=>{
        let turista = new Turista(req.body);
        turista.save().then(( tur )=>{
            Objekat.findOne({'naziv' : req.body.objekat}, (err, objekat) => {
                if(err) console.log(err);
                else{
                    Korisnik.findOne({"username": objekat.username}, function(err, korisnik) {
                        if(err) console.log(err);
                        else{
                            console.log(korisnik.username + " " + korisnik.boravisnaTaksa)
                            korisnik.boravisnaTaksa = korisnik.boravisnaTaksa != undefined ? korisnik.boravisnaTaksa + req.body.boravisnaTaksa : req.body.boravisnaTaksa;
                            console.log(korisnik.username + "**" + korisnik.boravisnaTaksa);
                            korisnik.save().then((kor)=>{
                                console.log(kor);
                                return res.json(tur);
                            }).catch(err => {
                                res.json(err);
                            })
                        }
                    })
                }
            })
            
        }).catch( err => {
            res.json(err);
        })
    }


    dohvatiTuristeOvlascenogKorisnika = (req: express.Request, res: express.Response)=>{
        let naziviObjekata = [ ];
        Objekat.find({'ovlasceni': { "$in": [req.body.ovlasceni]}}, (err, objekti)=>{
            if(err) console.log(err);
            else{
                for(let i = 0; i < objekti.length; i++){
                    naziviObjekata.push(objekti[i].get("naziv"));
                }
                Turista.find({'objekat': { $in : naziviObjekata}}, (err, zahtevi)=>{
                    if(err) console.log(err);
                    else{
                        return res.json(zahtevi);
                    }
                })
            }
            
            
        })
    }

    izmeniTuristu = (req: express.Request, res: express.Response)=>{
        Turista.findOneAndUpdate({"ime" : req.body.oldIme, "prezime": req.body.oldPrezime}, {
            "$set":{
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
        }, {new: true}).exec(function(err, tur){
            if(err){
                return res.json(err);
            }
            else{
                Objekat.findOne({'naziv' : req.body.objekat}, (err, objekat) => {
                    if(err) console.log(err);
                    else{
                        Korisnik.findOne({"username": objekat.username}, function(err, korisnik) {
                            if(err) console.log(err);
                            else{
                                console.log(korisnik.username + " " + korisnik.boravisnaTaksa)
                                korisnik.boravisnaTaksa = korisnik.boravisnaTaksa != undefined ? korisnik.boravisnaTaksa + req.body.boravisnaTaksa - req.body.oldBoravisnaTaksa : req.body.boravisnaTaksa - req.body.oldBoravisnaTaksa ;
                                console.log(korisnik.username + "**" + korisnik.boravisnaTaksa);
                                korisnik.save().then((kor)=>{
                                    console.log(kor);
                                    return res.json(tur);
                                }).catch(err => {
                                    res.json(err);
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    ukloniTuristu = (req: express.Request, res:express.Response)=>{
        Turista.deleteOne({"ime": req.body.ime, "prezime": req.body.prezime, "telefon": req.body.telefon}).then(tur => {
            if(tur){
                return res.json({"message" : "obrisano"})
            }
            else {
                return res.json({"message": "greska"})
            }
        })
    }

}
