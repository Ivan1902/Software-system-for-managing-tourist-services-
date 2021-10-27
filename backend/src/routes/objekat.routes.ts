import express from 'express'
import multer from 'multer';
import { ObjekatController } from '../controllers/objekat.controller';

const objekatRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
});

var upload = multer({storage: storage});


objekatRouter.route('/unesiUgostiteljskiObjekat').post(
    upload.array("files"), (req, res ) => {
        const files = req.files;
        let slike: string[];
        slike = [ ];
        if(Array.isArray(files) && files.length > 0){
            for(let index = 0; index < files.length; index++){
                slike.push("http://localhost:4000/uploads/"+files[index].filename);
            }
        }
        else{
            res.json({'message': 'Neuspesan unos'})
        }
        req.body.slike = slike;
        console.log(slike);
        new ObjekatController().unosUgostiteljskogObjekta(req, res);
    } 
)

objekatRouter.route('/pretraziUgostiteljskeObjekte').post(
    (req, res) => new ObjekatController().pretraziUgostiteljskeObjekte(req, res)
)


objekatRouter.route('/izmeniUgostiteljskiObjekat').post(
    upload.array("files"), (req, res) => {
        const files = req.files;
        let slike: string[];
        slike = [ ];
        let stareSlike: string[];
        stareSlike = req.body.slike.split(",");
        console.log(stareSlike[0] != '')
        if(stareSlike[0] != ''){
           
            for(let index = 0; index < stareSlike.length; index++){
                console.log('ete me')
                slike.push(stareSlike[index]);
            }
        }
        if(Array.isArray(files) && files.length > 0){
            for(let index = 0; index < files.length; index++){
                slike.push("http://localhost:4000/uploads/"+files[index].filename);
            }
        }
        console.log(slike);
        req.body.slike = slike;
        new ObjekatController().izmeniUgostiteljskiObjekat(req, res);
    }
)

objekatRouter.route('/dohvatiMojeNekategorisaneObjekte').post(
    (req, res) => new ObjekatController().dohvatiMojeNekategorisaneObjekte(req, res)
)

objekatRouter.route('/dohvatiObjekteOvlascenog').post(
    (req, res) => new ObjekatController().dohvatiObjekteOvlascenog(req, res)
)

objekatRouter.route('/ukloniObjekat').post(
    (req, res) => new ObjekatController().ukloniObjekat(req, res)
)

export default objekatRouter;