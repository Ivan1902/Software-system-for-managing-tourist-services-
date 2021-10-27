import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { Turista } from '../models/turista';
import { ObjektiService } from '../objekti.service';
import { TuristiService } from '../turisti.service';

@Component({
  selector: 'app-turista-izmena',
  templateUrl: './turista-izmena.component.html',
  styleUrls: ['./turista-izmena.component.css']
})
export class TuristaIzmenaComponent implements OnInit {

  turista: Turista;
  message: string;
  oldIme: string;
  oldPrezime: string;
  oldBoravisnaTaksa: number;
  mojiObjekti: Array<Objekat>;
  korisnik: Korisnik;

  constructor(private turistiServis: TuristiService, private location: Location, private objektiServis: ObjektiService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.turista = JSON.parse(localStorage.getItem('turista'));
    this.oldIme = this.turista.ime;
    this.oldPrezime = this.turista.prezime;
    this.oldBoravisnaTaksa = this.turista.boravisnaTaksa;
    this.objektiServis.dohvatiObjekteOvlascenog(this.korisnik.username).subscribe((obj: Array<Objekat>)=>{
      this.mojiObjekti = obj;
    })
  }

  obracunajBoravisnuTaksu( ) : number{
    if(this.turista.godine < 7) return 0;
    if(this.turista.lecenje) return 0;
    if(this.turista.invaliditet) return 0;
    if(this.turista.straniOslobodjen) return 0;
    
    return 160 * this.turista.nocenje;
    
  }

  potvrdiIzmene(){
   
    this.turista.boravisnaTaksa = this.obracunajBoravisnuTaksu();
    this.turistiServis.izmeniTuristu(this.oldIme, this.oldPrezime, this.turista.ime, this.turista.prezime, this.turista.godine,
      this.turista.telefon, this.turista.nocenje, this.turista.lecenje, this.turista.invaliditet, this.turista.straniOslobodjen, 
      this.turista.objekat, this.turista.boravisnaTaksa,this.oldBoravisnaTaksa, this.turista.datum).subscribe((tur: Turista)=>{
        this.turista = tur;
        this.oldIme = this.turista.ime;
        this.oldPrezime = this.turista.prezime;
        this.message = "Uspesno izmenjeno!";
      })
  }

  nazad(){
    let pretrazeniTuristi: Array<Turista>;
    pretrazeniTuristi = JSON.parse(localStorage.getItem('pretrazeniTuristi'));
    let tur : Turista;
    tur = JSON.parse(localStorage.getItem('turista'));
    let i = pretrazeniTuristi.findIndex(x => x.ime == tur.ime && x.prezime == tur.prezime);
    pretrazeniTuristi.splice(i, 1);
    pretrazeniTuristi.push(this.turista);
    localStorage.setItem('pretrazeniTuristi', JSON.stringify(pretrazeniTuristi))

    let sviTuristi: Array<Turista>;
    sviTuristi = JSON.parse(localStorage.getItem('sviTuristi'));
    i = sviTuristi.findIndex(x => x.ime == tur.ime && x.prezime == tur.prezime);
    sviTuristi.splice(i, 1);
    sviTuristi.push(this.turista);
    localStorage.setItem('sviTuristi', JSON.stringify(sviTuristi));

    localStorage.removeItem('turista');
    this.location.back();
  }

  ukloni(){
    this.turistiServis.ukloniTuristu(this.turista.ime, this.turista.prezime, this.turista.telefon).subscribe((rez: any)=>{
      if(rez.message = "obrisano"){
        let pretrazeniTuristi: Array<Turista>;
        pretrazeniTuristi = JSON.parse(localStorage.getItem('pretrazeniTuristi'));
        let tur : Turista;
        tur = JSON.parse(localStorage.getItem('turista'));
        let i = pretrazeniTuristi.findIndex(x => x.ime == tur.ime && x.prezime == tur.prezime);
        pretrazeniTuristi.splice(i, 1);
        localStorage.setItem('pretrazeniTuristi', JSON.stringify(pretrazeniTuristi))
    
        let sviTuristi: Array<Turista>;
        sviTuristi = JSON.parse(localStorage.getItem('sviTuristi'));
        i = sviTuristi.findIndex(x => x.ime == tur.ime && x.prezime == tur.prezime);
        sviTuristi.splice(i, 1);
        localStorage.setItem('sviTuristi', JSON.stringify(sviTuristi));
    
        localStorage.removeItem('turista');
        alert('Uspesno obrisano');
        this.location.back();
      }
    })
  }

}
