import express from 'express';
import Objekat from '../models/objekat';
import Turista from '../models/turista';



export class ObjekatController {
    unosUgostiteljskogObjekta = (req: express.Request, res: express.Response)=>{
        let objekat = new Objekat(req.body);
        objekat.save().then(( kor )=>{
            res.json({'message': 'Uspesan unos'})
        }).catch( err => {
            res.json(err);
        })
    }

    pretraziUgostiteljskeObjekte = (req: express.Request, res: express.Response)=>{
    Objekat.find({'naziv': new RegExp(req.body.naziv ? req.body.naziv : /.*/, "i"), 'grad': new RegExp(req.body.grad ? req.body.grad : /.*/, "i"), 'adresa': new RegExp(req.body.adresa ? req.body.adresa : /.*/, "i")},
        (err, objekti)=>{
            if(err) console.log(err);
            else{
                res.json(objekti);
            }
        })
    }

    izmeniUgostiteljskiObjekat = (req: express.Request, res: express.Response)=>{
        Objekat.findOneAndUpdate({"username" : req.body.oldUsername, "naziv": req.body.oldNaziv}, {
            "$set":{
                "username": req.body.username,
                "naziv": req.body.naziv,
                "adresa": req.body.adresa,
                "grad": req.body.grad,
                "opis": req.body.opis,
                "slike": req.body.slike,
                "kategorizovan": req.body.kategorizovan,
                "vrsta": req.body.vrsta,
                "poslatZahtev": req.body.poslatZahtev,
                "ovlasceni" : req.body.ovlasceni
            }
        }, {new: true}).exec(function(err, objekat){
            if(err){
                return res.json(err);
            }
            else{
                return res.json(objekat);
            }
        })
    }

    dohvatiMojeNekategorisaneObjekte = (req: express.Request, res: express.Response)=>{
        Objekat.find({'username' : req.body.username, 'kategorizovan': false}, (err, objekti)=>{
            if(err) console.log(err);
            else{
                res.json(objekti);
            }
        })
    }

    dohvatiObjekteOvlascenog = (req: express.Request, res: express.Response) => {
        Objekat.find({'ovlasceni': { "$in": [req.body.ovlasceni]}}, (err, objekti)=>{
            if(err) console.log(err);
            else{
                return res.json(objekti);
            }  
        })
    }

    ukloniObjekat = (req: express.Request, res: express.Response)=>{
        Turista.findOne({'objekat': req.body.naziv}, (err, kor)=>{
            if(err) console.log(err);
            else{
                if(kor){
                    res.json({'message': 'Postoji evidentirani turista'})
                }
                else{
                    Objekat.deleteOne({'naziv': req.body.naziv}, (err)=>{
                        if(err){
                            res.json({'message': 'Objekat ne postoji u sistemu'})
                        }
                        else{
                            res.json({'message': 'Objekat uspesno uklonjen'})
                        }
                    })
                }
            }
        })
       
    }


}
