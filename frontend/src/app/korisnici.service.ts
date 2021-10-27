import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  login(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/korisnici/login`,data);
  }

  dohvatiSveUgostitelje(){
    return this.http.get(`${this.uri}/korisnici/dohvatiUgostitelje`);
  }

  dodajUgostitelja(ime, prezime, username, password, tip, brTelefona, registrovan){
    const data = {
      ime: ime ,
      prezime: prezime,
      username: username, 
      password: password, 
      tip: tip,
      brTelefona: brTelefona,
      boravisnaTaksa: 0,
      registrovan: registrovan
    }

    return this.http.post(`${this.uri}/korisnici/dodajUgostitelja`, data);
  }

  ukloniKorisnika(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/korisnici/ukloniKorisnika`, data);
  }

  dohvatiOvlascene(){
    return this.http.get(`${this.uri}/korisnici/dohvatiOvlascene`);
  }

  dohvatiSveKorisnike(){
    return this.http.get(`${this.uri}/korisnici/dohvatiSveKorisnike`);
  }

  izmeniKorisnika(ime, prezime, username, password, tip, brTelefona, boravisnaTaksa, oldUsername, registrovan){
    const data = {
      ime: ime, 
      prezime: prezime,
      username: username,
      password: password, 
      tip: tip, 
      brTelefona: brTelefona,
      boravisnaTaksa: boravisnaTaksa,
      oldUsername: oldUsername,
      registrovan: registrovan
    }

    return this.http.post(`${this.uri}/korisnici/izmeniKorisnika`, data);
  }

  public uplacenaBoravisnaTaksa(username, uplaceno){
    const data = {
      username: username,
      uplaceno:uplaceno
    }

    return this.http.post(`${this.uri}/korisnici/uplacenaBoravisnaTaksa`, data);
  }

  dohvatiKorisnika(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, data);
  }
}
