import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { ObjektiService } from '../objekti.service';

@Component({
  selector: 'app-objekat-izmena',
  templateUrl: './objekat-izmena.component.html',
  styleUrls: ['./objekat-izmena.component.css']
})
export class ObjekatIzmenaComponent implements OnInit {
  objekat: Objekat;
  username: string;
  message: string;
  slike: any;
  slika: any;
  counter: number;
  oldNaziv: string;
  sviOvlasceniKorisnici: Array<Korisnik>;

  constructor(private servis: ObjektiService, private location: Location, private korisniciServis: KorisniciService) { }

  ngOnInit(): void {
    this.objekat = JSON.parse(localStorage.getItem('objekat'));
    this.username = this.objekat.username;
    this.slika = this.objekat.slike[0];
    this.counter = 0;
    this.oldNaziv = this.objekat.naziv;
    this.korisniciServis.dohvatiOvlascene().subscribe((korisnici: any)=>{
      this.sviOvlasceniKorisnici = korisnici;
    })
  }

  izmeni(){
    this.servis.izmeniUgostiteljskiObjekat(this.objekat, this.slike, this.username, this.oldNaziv).subscribe((object : Objekat)=>{
      this.objekat = object;
      localStorage.setItem('objekat', JSON.stringify(this.objekat));
      this.objekat = JSON.parse(localStorage.getItem('objekat'));
      this.username = this.objekat.username;
      this.oldNaziv = this.objekat.naziv;
      this.slika = this.objekat.slike[0];
      this.counter = 0;
      this.slike = null;
    })
  }

  uploadMultiple(event){
    this.slike = event;
  }

  previous(){
    if(this.counter == 0) return;
    this.slika = this.objekat.slike[--this.counter];
  }

  delete(){
    let i = this.objekat.slike.indexOf(this.slika);
    this.objekat.slike.splice(i, 1);
    if(this.counter + 1 < this.objekat.slike.length){
      this.next();
    }
    else if (this.counter - 1 > 0) {
      this.previous();
    }
    else{
      this.slika = null;
    } 
  }

  next(){
    if(this.counter == this.objekat.slike.length - 1) return;
    this.slika = this.objekat.slike[++this.counter]
  }

  nazad(){
    localStorage.removeItem('objekat');
    this.location.back();
  }

  ukloni(){
    this.message = "Neuspesno: Postoji evidentirani turista!";
  }

}
