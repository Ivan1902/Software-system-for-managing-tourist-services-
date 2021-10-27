import express from 'express'
import Korisnik from '../models/korisnik';
import Objekat from '../models/objekat';

export class KorisnikController{
    login = (req: express.Request, res: express.Response)=>{
        Korisnik.findOne({'username': req.body.username}, (err, user)=>{
            if(err) console.log(err);
            else{
                if(user){
                    Korisnik.findOne({'username': req.body.username, 'password': req.body.password}, (err, korisnik)=>{
                        if(err) console.log(err);
                        else{
                            if(korisnik){
                                res.json({'message': 'ok', 'korisnik': korisnik})
                            }
                            else{
                                res.json({'message': 'Neispravna lozinka!', 'korisnik': undefined }) 
                            }
                        }
                    })
                }
                else{
                    res.json({'message': 'Korisnik sa takvim korisnickim imenom ne postoji u sistemu!', 'korisnik': undefined})
                }
            }
        })
    }

    dohvatiUgostitelje = (req: express.Request, res: express.Response)=>{
        Korisnik.find({'tip': { "$nin": ['admin', 'ovlasceni' ]} }, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    dohvatiSveKorisnike = (req: express.Request, res: express.Response)=>{
        Korisnik.find({'tip': { "$ne": 'admin' } }, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    dohvatiOvlascene = (req: express.Request, res: express.Response)=>{
        Korisnik.find({'tip': 'ovlasceni' }, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    dodajUgostitelja = (req: express.Request, res: express.Response)=>{
        let korisnik = new Korisnik(req.body);
        Korisnik.findOne({'username': req.body.username}, (err, kor)=>{
            if(err) console.log(err);
            else{
                if(kor){
                    res.json({'message':'Ugostitelj vec postoji u sistemu'});
                }
                else{
                    korisnik.save().then(( kor )=>{
                        res.json({'message': 'Uspesan unos'})
                    }).catch( err => {
                        res.json(err);
                    })
                }
            }
        })
    }

    ukloniKorisnika = (req: express.Request, res: express.Response)=>{
        Objekat.findOne({'username': req.body.username}, (err, kor)=>{
            if(err) console.log(err);
            else{
                if(kor){
                    res.json({'message': 'Korisnik je vlasnik nekog ugostiteljskog objekta'})
                }
                else{
                    Korisnik.deleteOne({'username': req.body.username}, (err)=>{
                        if(err){
                            res.json({'message': 'Ugostitelj ne postoji u sistemu'})
                        }
                        else{
                            res.json({'message': 'Korisnik uspesno uklonjen'})
                        }
                    })
                }
            }
        })
       
    }

    izmeniKorisnika = (req: express.Request, res: express.Response)=>{
        Korisnik.findOneAndUpdate({"username" : req.body.oldUsername}, {
            "$set":{
                "ime": req.body.ime,
                "prezime": req.body.prezime,
                "username": req.body.username,
                "password": req.body.password,
                "tip": req.body.tip,
                "brTelefona": req.body.brTelefona,
                "boravisnaTaksa": req.body.boravisnaTaksa,
                "registrovan": req.body.registrovan
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

    uplacenaBoravisnaTaksa = (req: express.Request, res: express.Response) => {
        Korisnik.collection.updateOne({'username': req.body.username},
        {$inc: {'boravisnaTaksa': -req.body.uplaceno}});
        res.json({poruka:'ok'})
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        Korisnik.findOne({'username': username}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }
}