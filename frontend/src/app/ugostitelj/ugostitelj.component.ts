import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { UIStateService } from '../app.component';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { ObjektiService } from '../objekti.service';

@Component({
  selector: 'app-ugostitelj',
  templateUrl: './ugostitelj.component.html',
  styleUrls: ['./ugostitelj.component.css']
})
export class UgostiteljComponent implements OnInit {
  naziv: string;
  adresa: string;
  grad: string;
  slike: any;
  opis: string;
  message: string;
  korisnik: Korisnik;
  nazivPretraga: string;
  adresaPretraga: string;
  gradPretraga: string;
  pretrazeniUgostiteljskiObjekti: Objekat[] = [ ];
  mojiNekategorisaniObjekti: Objekat[] = [ ];
  vrsta: string;
  selectedIndex = 0;
  sviOvlasceniKorisnici: Array<Korisnik> = [ ];
  ovlasceniKorisnici: string[] = [ ];
  uplatiDeo: boolean = false;
  deoNovca: number = 0;
  handler: any = null;
  uplaceno: number = 0;

  constructor(private objektiServis: ObjektiService, private router: Router, private uiStateService: UIStateService, 
    private location: Location, public korisniciServis: KorisniciService) { }
  

  ngOnInit(): void {
    this.loadStripe();
    this.selectedIndex = this.uiStateService.pageOneSelectedTab;
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.objektiServis.dohvatiMojeNekategorisaneObjekte(this.korisnik.username).subscribe((objects: Objekat[])=>{
      this.mojiNekategorisaniObjekti = objects;
    })
    this.korisniciServis.dohvatiOvlascene().subscribe((korisnici: any)=>{
      this.sviOvlasceniKorisnici = korisnici;
    })
    if(localStorage.getItem('pretrazeni')){
      this.pretrazeniUgostiteljskiObjekti = JSON.parse(localStorage.getItem('pretrazeni'));
    }
    
  }

  tabChanged(event: MatTabChangeEvent) {
    this.uiStateService.pageOneSelectedTab = event.index;
  }

  emailFormControl = new FormControl('', [
    Validators.required, 
    Validators.email
  ])

  uploadMultiple(event: any){
    this.slike = event;
  }

  unesiUgostiteljskiObjekat(){
    if(!this.korisnik.registrovan){
      this.message = "Ugostitelj nije registrovan kod nadleznog organa"!;
      return;
    }
    if(!this.naziv|| !this.adresa || !this.grad || !this.opis || !this.korisnik.username || !this.vrsta || !this.ovlasceniKorisnici){
      this.message = "Sva polja moraju biti popunjena!";
      return;
    }
    else if(this.slike){
      this.objektiServis.unesiUgostiteljskiObjekat(this.naziv, this.adresa, this.grad, 
        this.opis, this.slike, this.korisnik.username, false, this.vrsta, false, this.ovlasceniKorisnici).subscribe((poruka:any)=>{
        this.message = poruka.message;
        this.objektiServis.dohvatiMojeNekategorisaneObjekte(this.korisnik.username).subscribe((objects: Objekat[])=>{
          this.mojiNekategorisaniObjekti = objects;
        })
      })
    }
    else{
      this.message = "Morate uneti bar jednu sliku!";
    }
    
  }

  pretraziUgostiteljskeObjekte(){
    this.objektiServis.pretraziUgostiteljskeObjekte(this.nazivPretraga, this.adresaPretraga, this.gradPretraga).subscribe((objekti: Objekat[])=>{
      this.pretrazeniUgostiteljskiObjekti = objekti;
      localStorage.setItem('pretrazeni', JSON.stringify(this.pretrazeniUgostiteljskiObjekti));
    })

  }

  detaljnije(objekat){
    localStorage.setItem('objekat', JSON.stringify(objekat));
    this.router.navigate(['objekat-pregled']);
  }

  izmeni(objekat){
    localStorage.setItem('objekat', JSON.stringify(objekat));
    this.router.navigate(['objekat-izmena']);
  }

  kategorisi(objekat){
    localStorage.setItem('objekat', JSON.stringify(objekat));
    this.router.navigate(['kategorizacija']);
  }

  izmeniZahtev(objekat){
    localStorage.setItem('objekat', JSON.stringify(objekat));
    this.router.navigate(['kategorizacija-izmena']);
  }

  logout() {
    this.selectedIndex = 0;
    localStorage.removeItem('pretrazeni');
    localStorage.removeItem('ulogovan');
    this.router.navigate(['login']);
  }

  uplatiDeoZaduzenja(){
    this.uplatiDeo = !this.uplatiDeo;
  }

  uplacenaBoravisnaTaksa(){
    this.korisniciServis.uplacenaBoravisnaTaksa(this.korisnik.username, this.uplaceno).subscribe((msg: any)=>{
      if(msg.poruka){
        this.korisnik.boravisnaTaksa = this.korisnik.boravisnaTaksa - this.uplaceno;
        localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
        this.uplaceno = 0;
      }
    })
  };

  uplati(amount: any) {    
    
    var handler = (<any>window).StripeCheckout.configure({
      
      key: 'pk_test_51JeiIXIb5p6v8J61hJiUNqFyLVMaojG7m2KOH8nbVfvIJpeG1QL3OoAGaGDmqQQ6sSYu84oYkl5pB2WG18nypW8G00iBmPlB5k',
      locale: 'auto',
      token:  (token: any) => {
        console.log(token)
        this.uplaceno = amount;
        this.uplacenaBoravisnaTaksa();
      }
    });
 
    handler.open({
      name: 'Uplata boravisne takse',
      description: this.korisnik.ime +" " + this.korisnik.prezime,
      amount: (amount * 100) / 117.58,
      currency: 'EUR'
    });
 
  }

 
  loadStripe() {
     
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JeiIXIb5p6v8J61hJiUNqFyLVMaojG7m2KOH8nbVfvIJpeG1QL3OoAGaGDmqQQ6sSYu84oYkl5pB2WG18nypW8G00iBmPlB5k',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }


  

}
