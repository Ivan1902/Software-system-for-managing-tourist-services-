import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjektiService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;

    const formdata = new FormData();

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formdata.append('files', element);
    }

    return this.http.post(`${this.uri}/objekti/multifiles`, formdata);
  }

  unesiUgostiteljskiObjekat(naziv, adresa, grad, opis, slika, username, kategorizovan, vrsta ,poslatZahtev, ovlasceni){
    const files: FileList = slika.target.files;

    const formData = new FormData();

    for(let index = 0; index < files.length; index++){
      const element = files[index];
      formData.append('files', element);
    }
    formData.set('naziv', naziv);
    formData.set('adresa', adresa);
    formData.set('grad', grad);
    formData.set('opis', opis);
    formData.set('username', username);
    formData.set('kategorizovan', kategorizovan);
    formData.set('vrsta', vrsta);
    formData.set('poslatZahtev', poslatZahtev);
    formData.set('ovlasceni', ovlasceni);

    //console.log('ovde')
    return this.http.post(`${this.uri}/objekti/unesiUgostiteljskiObjekat`, formData);
  }

  pretraziUgostiteljskeObjekte(naziv, adresa, grad){
    const data = {
      naziv: naziv, 
      adresa: adresa,
      grad: grad
    }

    return this.http.post(`${this.uri}/objekti/pretraziUgostiteljskeObjekte`, data);
  }

  izmeniUgostiteljskiObjekat(objekat, slike, oldUsername, oldNaziv){
    const formData = new FormData();
    if(slike){
      const files: FileList = slike.target.files;
      for(let index = 0; index < files.length; index++){
        const element = files[index];
        formData.append('files', element);
      }
    }
    formData.set('naziv', objekat.naziv);
    formData.set('adresa', objekat.adresa);
    formData.set('grad', objekat.grad);
    formData.set('opis', objekat.opis);
    formData.set('username', objekat.username);
    formData.set('oldUsername', oldUsername);
    formData.set('slike', objekat.slike);
    formData.set('kategorizovan', objekat.kategorizovan);
    formData.set('vrsta', objekat.vrsta);
    formData.set('poslatZahtev', objekat.poslatZahtev);
    formData.set('ovlasceni', objekat.ovlasceni);
    formData.set('oldNaziv', oldNaziv);

    //console.log('ovde')
    return this.http.post(`${this.uri}/objekti/izmeniUgostiteljskiObjekat`, formData);
  }


  dohvatiMojeNekategorisaneObjekte(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/objekti/dohvatiMojeNekategorisaneObjekte`, data);
  }

  dohvatiObjekteOvlascenog(ovlasceni){
    const data = {
      ovlasceni: ovlasceni
    }
    return this.http.post(`${this.uri}/objekti/dohvatiObjekteOvlascenog`, data);
  }

}
