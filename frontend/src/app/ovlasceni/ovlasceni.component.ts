import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UIStateService } from '../app.component';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { Turista } from '../models/turista';
import { Zahtev } from '../models/zahtev';
import { ObjektiService } from '../objekti.service';
import { TuristiService } from '../turisti.service';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-ovlasceni',
  templateUrl: './ovlasceni.component.html',
  styleUrls: ['./ovlasceni.component.css']
})
export class OvlasceniComponent implements OnInit {

  korisnik: Korisnik;
  selectedIndex = 0;
  zahteviOvlascenogKorisnika: Array<Zahtev>;
  nazivPretraga: string = null;
  message: string;
  usernamePretraga: string = null;
  pretrazeniZahtevi: Array<Zahtev>;
  sviZahtevi: Array<Zahtev>;

  imePretraga: string;
  prezimePretraga: string;
  godinePretraga: number;
  telefonPretraga: number;
  nocenjePretraga: number;
  lecenjePretraga: boolean;
  invaliditetPretraga: boolean;
  straniOslobodjenPretraga: boolean;
  objekatPretraga: string;
  boravisnaTaksa: number;

  sviTuristi: Array<Turista>;
  pretrazeniTuristi: Array<Turista>;
  mojiObjekti: Array<Objekat>;

  constructor(private objektiServis: ObjektiService, private router: Router, private uiStateService: UIStateService, 
    private location: Location, private korisniciServis: KorisniciService, private zahteviServis: ZahteviService,
    private turistiServis: TuristiService) { }

  ngOnInit(): void {
    this.selectedIndex = this.uiStateService.pageOneSelectedTab;
    
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));

    if(localStorage.getItem('pretrazeniZahtevi')){
      this.pretrazeniZahtevi = JSON.parse(localStorage.getItem('pretrazeniZahtevi'));
      this.sviZahtevi = JSON.parse(localStorage.getItem('sviZahtevi'));
    }
    else{
      this.zahteviServis.dohvatiZahteveOvlascenogKorisnika(this.korisnik.username).subscribe((objekti: Zahtev[])=>{
        this.zahteviOvlascenogKorisnika = objekti;
        this.pretrazeniZahtevi = this.zahteviOvlascenogKorisnika;
        localStorage.setItem('pretrazeniZahtevi', JSON.stringify(this.zahteviOvlascenogKorisnika));
        localStorage.setItem('sviZahtevi', JSON.stringify(this.zahteviOvlascenogKorisnika));
      })
    }
    if(localStorage.getItem('pretrazeniTuristi')){
      this.pretrazeniTuristi = JSON.parse(localStorage.getItem('pretrazeniTuristi'));
      this.sviTuristi = JSON.parse(localStorage.getItem('sviTuristi'));
    }
    else{
      this.turistiServis.dohvatiTuristeOvlascenogKorisnika(this.korisnik.username).subscribe((turisti: Turista[])=>{
        this.sviTuristi = turisti;
        this.pretrazeniTuristi = turisti;
        localStorage.setItem('pretrazeniTuristi', JSON.stringify(this.sviTuristi));
        localStorage.setItem('sviTuristi', JSON.stringify(this.sviTuristi));
      })
    }
    this.objektiServis.dohvatiObjekteOvlascenog(this.korisnik.username).subscribe((obj: Array<Objekat>)=>{
      this.mojiObjekti = obj;
    })
  }

  
  tabChanged(event: MatTabChangeEvent) {
    this.uiStateService.pageOneSelectedTab = event.index;
  }

  pretraziZahteve(){
    this.pretrazeniZahtevi = this.zahteviOvlascenogKorisnika;
    if(this.nazivPretraga){
      this.pretrazeniZahtevi = this.pretrazeniZahtevi.filter(x => x.naziv.toLowerCase().indexOf(this.nazivPretraga.toLowerCase()) != -1)
    }
    if(this.usernamePretraga){
      this.pretrazeniZahtevi = this.pretrazeniZahtevi.filter(x => x.username.toLowerCase().indexOf(this.usernamePretraga.toLowerCase()) != -1)
    }

  }

  logout() {
    this.selectedIndex = 0;
    localStorage.removeItem('pretrazeniTuristi');
    localStorage.removeItem('pretrazeniZahtevi');
    localStorage.removeItem('sviTuristi');
    localStorage.removeItem('ulogovan');
    this.location.back();
  }

  pretraziKorisnike(){
    this.message = null;
    this.pretrazeniTuristi = this.sviTuristi;
    if(this.imePretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.ime.toLowerCase().indexOf(this.imePretraga.toLowerCase()) != -1)
    }
    if(this.prezimePretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.prezime.toLowerCase().indexOf(this.prezimePretraga.toLowerCase()) != -1)
    }
    if(this.godinePretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.godine == this.godinePretraga)
    }
    if(this.telefonPretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.telefon == this.telefonPretraga)
    }
    if(this.nocenjePretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.nocenje == this.nocenjePretraga)
    }
    if(this.lecenjePretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.lecenje == this.lecenjePretraga)
    }
    if(this.invaliditetPretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.invaliditet == this.invaliditetPretraga)
    }
    if(this.straniOslobodjenPretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.straniOslobodjen == this.straniOslobodjenPretraga)
    }
    if(this.objekatPretraga){
      this.pretrazeniTuristi = this.pretrazeniTuristi.filter(x => x.objekat.toLowerCase().indexOf(this.objekatPretraga.toLowerCase()) != -1)
    }
    localStorage.setItem('pretrazeniTuristi', JSON.stringify(this.pretrazeniTuristi));
  }

  izmena(turista){
    localStorage.setItem('turista', JSON.stringify(turista));
    this.router.navigate(['turista-izmena']);
  }

  dodajKorisnika(){
    if(this.imePretraga != null && this.prezimePretraga != null  && this.godinePretraga != null && this.telefonPretraga != null && this.nocenjePretraga != null &&
      this.lecenjePretraga != null && this.invaliditetPretraga != null && this.straniOslobodjenPretraga != null && this.objekatPretraga != null){
        let exist = false;
        this.mojiObjekti.forEach(objekat => {
          if(objekat.naziv == this.objekatPretraga){
            exist = true;
          } 
        });
        if(!exist) {
          this.message = "Nemate korisnicka prava za prijavu turista u ovom ugostiteljskom objektu!"
        }
        else{
          this.boravisnaTaksa = this.obracunajBoravisnuTaksu();
          this.turistiServis.unosTuriste(this.imePretraga, this.prezimePretraga, this.godinePretraga, this.telefonPretraga, this.nocenjePretraga, this.lecenjePretraga,
            this.invaliditetPretraga, this.straniOslobodjenPretraga, this.objekatPretraga, this.boravisnaTaksa).subscribe((tur: Turista)=>{
              this.sviTuristi.push(tur);
              localStorage.setItem('sviTuristi', JSON.stringify(this.sviTuristi));
              this.message = "Uspesan unos";
            })
        }
        
      }
      else{
        this.message = "Sva polja moraju biti popunjena!";
      }
  }

  obracunajBoravisnuTaksu() : number {
    if(this.godinePretraga < 7) return 0;
    if(this.invaliditetPretraga) return 0;
    if(this.lecenjePretraga) return 0;
    if(this.straniOslobodjenPretraga) return 0;
    return this.nocenjePretraga * 160;
  }


   upload(event){
    let fileInputControl = event.target;
    let files = fileInputControl.files;

    let firstFile = files[0];

    let fileReader = new FileReader();

    fileReader.onload = (event) => {
      let fileContents = event.target.result;
      let arrayOfLines = (<string>fileContents).split(/\r?\n/);

      
      
      this.imePretraga = (arrayOfLines[2].substring(arrayOfLines[2].indexOf(":") + 1)).trim();
      this.prezimePretraga = (arrayOfLines[3].substring(arrayOfLines[3].indexOf(":") + 1)).trim();
      this.telefonPretraga = Number.parseInt(arrayOfLines[4].substring(arrayOfLines[4].indexOf(":") + 1));
      this.godinePretraga = Number.parseInt(arrayOfLines[5].substring(arrayOfLines[5].indexOf(":") + 1));
      this.objekatPretraga = (arrayOfLines[6].substring(arrayOfLines[6].indexOf(":") + 1)).trim();
      this.nocenjePretraga = Number.parseInt(arrayOfLines[7].substring(arrayOfLines[7].indexOf(":") + 1));
      let lecenje = (arrayOfLines[8].substring(arrayOfLines[8].indexOf(":") + 1)).trim();
      let invaliditet = (arrayOfLines[9].substring(arrayOfLines[9].indexOf(":") + 1)).trim();
      let strani = (arrayOfLines[10].substring(arrayOfLines[10].indexOf(":") + 1)).trim();
      
      if(lecenje.toLowerCase() == "da"){
        this.lecenjePretraga = true;
      }
      else if(lecenje.toLowerCase() == "ne"){
        this.lecenjePretraga = false;
      }
      else{
        this.lecenjePretraga = null;
      }

      if(invaliditet.toLowerCase() == "da"){
        this.invaliditetPretraga = true;
      }
      else if(invaliditet.toLowerCase() == "ne"){
        this.invaliditetPretraga = false;
      }
      else{
        this.invaliditetPretraga = null;
      }

      if(strani.toLowerCase() == "da"){
        this.straniOslobodjenPretraga = true;
      }
      else if(strani.toLowerCase() == "ne"){
        this.straniOslobodjenPretraga = false;
      }
      else{
        this.straniOslobodjenPretraga = null;
      }

      

    }

    fileReader.readAsText(firstFile);
  }

 
}
