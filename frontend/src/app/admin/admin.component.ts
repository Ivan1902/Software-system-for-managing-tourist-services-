import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UIStateService } from '../app.component';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/korisnik';
import { Zahtev } from '../models/zahtev';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  addForm: FormGroup;
  ime: string;
  prezime: string;
  username: string;
  password: string;
  tip: string;
  message: string;
  brTelefona: string;
  passwordConfirmation;
  messageKategorizacija: string;
  registrovan: boolean;

  imePretraga: string;
  prezimePretraga: string;
  tipPretraga: string;
  telefonPretraga: string;
  sviKorisnici: Array<Korisnik> = [ ];
  pretrazeniKorisnici: Array<Korisnik> = [ ];
  sviZahtevi: Array<Zahtev> = [ ];
  sviUgostitelji: Array<Korisnik>;



  selectedIndex = 0;

  constructor(private servis: KorisniciService, private ruter: Router, private formBuilder: FormBuilder,
    private uiStateService: UIStateService, private zahteviServis: ZahteviService) { 
  
    }

  ngOnInit(): void {

    this.selectedIndex = this.uiStateService.pageOneSelectedTab;
    this.servis.dohvatiSveKorisnike().subscribe((kor: Korisnik[])=>{
      this.sviKorisnici = kor;
      this.pretrazeniKorisnici = kor;
      localStorage.setItem('pretrazeniKorisnici', JSON.stringify(this.pretrazeniKorisnici));
      localStorage.setItem("sviKorisnici", JSON.stringify(this.sviKorisnici));
    })

    this.zahteviServis.dohvatiSveZahteveZaKategorizaciju().subscribe((zahtevi: Zahtev[])=>{
      this.sviZahtevi = zahtevi;
    })

    this.servis.dohvatiSveUgostitelje().subscribe((korisnici:Korisnik[])=>{
      this.sviUgostitelji = korisnici;
    })


    
  }

  tabChanged(event: MatTabChangeEvent) {
    this.uiStateService.pageOneSelectedTab = event.index;
  }

  


  logout(){
    localStorage.removeItem("ulogovan");
    this.ruter.navigate(['login']);
  }

  opsirnije(ugostitelj){
    localStorage.setItem("pregledUgostitelja", JSON.stringify(ugostitelj));
    this.ruter.navigate(["ugostitelj-pregled"]);
  }

  dodajUgostitelja(){
    if(!this.ime || !this.prezime || !this.username || !this.password || !this.tip || !this.brTelefona || !this.registrovan){
      this.message = "Sva polja moraju biti popunjena!";
      return;
    }
    if(this.password != this.passwordConfirmation){
      this.message = "Lozinke se ne podudaraju!";
      return;
    }
    this.servis.dodajUgostitelja(this.ime, this.prezime, this.username, this.password, this.tip, this.brTelefona, this.registrovan).subscribe((poruka: any)=>{
      
      this.message = poruka.message;
      this.servis.dohvatiSveKorisnike().subscribe((kor: Korisnik[])=>{
        this.sviKorisnici = kor;
        this.pretrazeniKorisnici = kor;
        localStorage.setItem('pretrazeniKorisnici', JSON.stringify(this.pretrazeniKorisnici));
        localStorage.setItem("sviKorisnici", JSON.stringify(this.sviKorisnici));
      })
      this.servis.dohvatiSveUgostitelje().subscribe((korisnici:Korisnik[])=>{
        this.sviUgostitelji = korisnici;
      })
  
    })
  }

  izmeni(ugostitelj){

  }

  

  pretraziKorisnike(){
    this.message = null;
    this.pretrazeniKorisnici = this.sviKorisnici;
    if(this.imePretraga){
      this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(x => x.ime.toLowerCase().indexOf(this.imePretraga.toLowerCase()) != -1)
    }
    if(this.prezimePretraga){
      this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(x => x.prezime.toLowerCase().indexOf(this.prezimePretraga.toLowerCase()) != -1)
    }
    if(this.tipPretraga){
      this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(x => x.tip == this.tipPretraga)
    }
    if(this.telefonPretraga){
      this.pretrazeniKorisnici = this.pretrazeniKorisnici.filter(x => x.brTelefona.toString().indexOf(this.telefonPretraga.toString()) != -1)
    }
   
    localStorage.setItem('pretrazeniKorisnici', JSON.stringify(this.pretrazeniKorisnici));
  }

  izmena(korisnik){
    localStorage.setItem('korisnik', JSON.stringify(korisnik));
    this.ruter.navigate(['korisnik-izmena']);
  }

  kategorisi(zahtev){
    if(!zahtev.zvezdice){
      this.messageKategorizacija = "Niste ocenili ugostiteljski objekat " + zahtev.naziv + "!";

    }
    else{
      this.zahteviServis.kategorisiObjekat(zahtev.naziv, zahtev.zvezdice).subscribe((tmp:any)=>{
        if(tmp.message = "obrisano"){
          let i = this.sviZahtevi.indexOf(zahtev);
          this.sviZahtevi.splice(i, 1);
          this.messageKategorizacija = '';
        }
      })
    }
  }

  

}
