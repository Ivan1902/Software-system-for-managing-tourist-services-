import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TuristiService {
  uri = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  unosTuriste(ime, prezime, godine, telefon, nocenje, lecenje, invaliditet, straniOslobodjen, objekat, boravisnaTaksa){
    const data = {
      ime: ime, 
      prezime: prezime,
      godine: godine, 
      telefon: telefon, 
      nocenje: nocenje, 
      lecenje: lecenje, 
      invaliditet: invaliditet, 
      straniOslobodjen: straniOslobodjen,
      objekat: objekat,
      boravisnaTaksa: boravisnaTaksa,
      datum: new Date()
    }

    return this.http.post(`${this.uri}/turisti/unosTuriste`, data);
  }

  dohvatiTuristeOvlascenogKorisnika(ovlasceni){
    const data = {
      ovlasceni: ovlasceni
    }

    return this.http.post(`${this.uri}/turisti/dohvatiTuristeOvlascenogKorisnika`, data);
  }

  izmeniTuristu(oldIme, oldPrezime, ime, prezime, godine, telefon, nocenje, lecenje, invaliditet, straniOslobodjen, objekat, boravisnaTaksa, oldBoravisnaTaksa, datum){
    const data = {
      oldIme: oldIme,
      oldPrezime: oldPrezime,
      ime: ime, 
      prezime: prezime, 
      godine: godine, 
      telefon: telefon, 
      lecenje: lecenje,
      invaliditet: invaliditet, 
      straniOslobodjen: straniOslobodjen, 
      objekat: objekat,
      nocenje: nocenje,
      boravisnaTaksa: boravisnaTaksa,
      oldBoravisnaTaksa: oldBoravisnaTaksa,
      datum: datum
    }

    return this.http.post(`${this.uri}/turisti/izmeniTuristu`, data);
  }

  ukloniTuristu(ime, prezime, telefon){
    const data = {
      ime: ime, 
      prezime: prezime,
      telefon: telefon
    }

    return this.http.post(`${this.uri}/turisti/ukloniTuristu`, data);
  }
}
