import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahteviService {


  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }


  unesiZahtevZaKategorizaciju(username, naziv, formular){
    

    const formData = new FormData();
    alert(formular);

    formData.set('file', formular);
    formData.set('naziv', naziv);
    formData.set('username', username);

    //console.log('ovde')
    return this.http.post(`${this.uri}/zahtevi/unosZahtevaZaKategorizaciju`, formData);
  }

  dohvatiZahtevZaKategorizaciju(username, naziv){
    const data = {
      "username" : username, 
      "naziv" : naziv
    }
    return this.http.post(`${this.uri}/zahtevi/dohvatiZahtevZaKategorizaciju`, data);
  }

  dohvatiZahteveOvlascenogKorisnika(username){
    const data = {
      "ovlasceni": username
    }

    return this.http.post(`${this.uri}/zahtevi/dohvatiZahteveOvlascenogKorisnika`, data);
  }

  dohvatiSveZahteveZaKategorizaciju(){
    return this.http.get(`${this.uri}/zahtevi/dohvatiSveZahteveZaKategorizaciju`);
  }

  kategorisiObjekat(naziv, zvezdice){
    const data = {
      naziv: naziv,
      zvezdice: zvezdice
    }

    return this.http.post(`${this.uri}/zahtevi/kategorisiObjekat`,data);
  }

}
