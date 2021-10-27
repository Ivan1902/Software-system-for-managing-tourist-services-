import express from 'express';
import Zahtev from '../models/zahtev';
import Objekat from '../models/objekat';



export class ZahtevController {
    unosZahtevaZaKategorizaciju = (req: express.Request, res: express.Response)=>{
        let zahtev = new Zahtev(req.body);
        zahtev.save().then(( kor )=>{
            Objekat.findOneAndUpdate({"username" : req.body.username, "naziv": req.body.naziv}, {
                $set: {"poslatZahtev": true}
            }).exec(function(err, objekat){
            if(err){
                return res.json(err);
            }
            else{
                res.json({'message': 'Uspesan unos'});
            }
        })
            
        }).catch( err => {
            res.json(err);
        })
    }

    dohvatiZahtevZaKategorizaciju = (req: express.Request, res: express.Response)=>{
        Zahtev.findOne({'username' : req.body.username, 'naziv': req.body.naziv}, (err, zahtev)=>{
            if(err) console.log(err);
            else{
                res.json(zahtev);
            }
        })
    }

    dohvatiZahteveOvlascenogKorisnika = (req: express.Request, res: express.Response)=>{
        let naziviObjekata = [ ];
        Objekat.find({'ovlasceni': { "$in": [req.body.ovlasceni]}}, (err, objekti)=>{
            if(err) console.log(err);
            else{
                for(let i = 0; i < objekti.length; i++){
                    console.log(objekti[i].get("naziv"))
                    naziviObjekata.push(objekti[i].get("naziv"));
                }
                Zahtev.find({'naziv': { $in : naziviObjekata}}, (err, zahtevi)=>{
                    if(err) console.log(err);
                    else{
                        return res.json(zahtevi);
                    }
                })
            }
            
            
        })
    }

    dohvatiSveZahteveZaKategorizaciju = (req: express.Request, res: express.Response)=>{
        Zahtev.find({},(err, zahtevi)=>{
            if(err) console.log(err);
            else res.json(zahtevi);
        })
    }

    kategorisiObjekat = (req: express.Request, res: express.Response) => {
        Objekat.findOneAndUpdate({"naziv" : req.body.naziv}, {
            $set: {"zvezdice": req.body.zvezdice, "kategorizovan": true}
        }).exec(function(err, objekat){
        if(err){
            return res.json(err);
        }
        else{
            Zahtev.deleteOne({"naziv": req.body.naziv}).then(zah => {
                if(zah){
                    return res.json({"message" : "obrisano"})
                }
                else {
                    return res.json({"message": "greska"})
                }
            })
        }
        })
    }

}
