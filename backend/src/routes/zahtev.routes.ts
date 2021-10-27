import express from 'express'
import multer from 'multer';
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/docs");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
});

var upload = multer({storage: storage});


zahtevRouter.route('/unosZahtevaZaKategorizaciju').post(
    upload.single("file"), (req, res ) => {
        
        req.body.formular = "http://localhost:4000/docs/"+req.file.filename;
        new ZahtevController().unosZahtevaZaKategorizaciju(req, res);
    } 
)

zahtevRouter.route('/dohvatiZahtevZaKategorizaciju').post(
  (req, res) => new ZahtevController().dohvatiZahtevZaKategorizaciju( req, res)
)

zahtevRouter.route('/dohvatiZahteveOvlascenogKorisnika').post(
  (req, res) => new ZahtevController().dohvatiZahteveOvlascenogKorisnika(req, res)
)

zahtevRouter.route('/dohvatiSveZahteveZaKategorizaciju').get(
  (req, res) => new ZahtevController().dohvatiSveZahteveZaKategorizaciju(req, res)
)

zahtevRouter.route('/kategorisiObjekat').post(
  (req, res) => new ZahtevController().kategorisiObjekat(req, res)
)



export default zahtevRouter;