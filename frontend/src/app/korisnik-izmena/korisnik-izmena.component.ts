import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-korisnik-izmena',
  templateUrl: './korisnik-izmena.component.html',
  styleUrls: ['./korisnik-izmena.component.css']
})
export class KorisnikIzmenaComponent implements OnInit {

  korisnik: Korisnik;
  message: string;
  oldUsername: string;

  constructor(private korisniciServis: KorisniciService, private location: Location) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('korisnik'));
    this.oldUsername = this.korisnik.username;
  }

  potvrdiIzmene(){
    this.korisniciServis.izmeniKorisnika(this.korisnik.ime,this.korisnik.prezime, this.korisnik.username, this.korisnik.password,
      this.korisnik.tip, this.korisnik.brTelefona, this.korisnik.boravisnaTaksa, this.oldUsername, this.korisnik.registrovan).subscribe((kor1: Korisnik)=>{
        this.korisnik = kor1;
        this.message = 'Uspesno izmenjeni podaci!';

        let pretrazeniKorisnici: Array<Korisnik>;
        pretrazeniKorisnici = JSON.parse(localStorage.getItem('pretrazeniKorisnici'));
        let kor : Korisnik;
        kor = JSON.parse(localStorage.getItem('korisnik'));
        let i = pretrazeniKorisnici.findIndex(x => x.username == kor.username);
        pretrazeniKorisnici.splice(i, 1);
        pretrazeniKorisnici.splice(i, 0, this.korisnik);
        localStorage.setItem('pretrazeniKorisnici', JSON.stringify(pretrazeniKorisnici))
    
        let sviKorisnici: Array<Korisnik>;
        sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'));
        i = sviKorisnici.findIndex(x => x.username == kor.username);
        sviKorisnici.splice(i, 1);
        sviKorisnici.push(this.korisnik);
        localStorage.setItem('sviKorisnici', JSON.stringify(sviKorisnici));
      })
  }

  ukloni(){
    this.korisniciServis.ukloniKorisnika(this.korisnik.username).subscribe((resp: any)=>{
      if(resp.message = 'Korisnik uspesno uklonjen'){
        let pretrazeniKorisnici: Array<Korisnik>;
        pretrazeniKorisnici = JSON.parse(localStorage.getItem('pretrazeniKorisnici'));
        let kor : Korisnik;
        kor = JSON.parse(localStorage.getItem('korisnik'));
        let i = pretrazeniKorisnici.findIndex(x => x.username == kor.username);
        pretrazeniKorisnici.splice(i, 1);
        localStorage.setItem('pretrazeniKorisnici', JSON.stringify(pretrazeniKorisnici))
    
        let sviKorisnici: Array<Korisnik>;
        sviKorisnici = JSON.parse(localStorage.getItem('sviKorisnici'));
        i = sviKorisnici.findIndex(x => x.username == kor.username);
        sviKorisnici.splice(i, 1);
        localStorage.setItem('sviKorisnici', JSON.stringify(sviKorisnici));

        //alert('Korisnik uspesno uklonjen');
        //this.nazad();
        this.message = "Neuspesno: Korisnik je vlasnik bar jednog ugostiteljskog objekta!"
      }
      else{
        this.message = resp.message;
      }
    })
  }

  nazad(){
  

    localStorage.removeItem('korisnik');
    this.location.back();
  }

}
