import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { Zahtev } from '../models/zahtev';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-kategorizacija-izmena',
  templateUrl: './kategorizacija-izmena.component.html',
  styleUrls: ['./kategorizacija-izmena.component.css']
})
export class KategorizacijaIzmenaComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  korisnik: Korisnik;
  objekat: Objekat;
  formular: any;
  message: string;
  zahtevZaKategorizaciju: Zahtev;

  constructor(private _formBuilder: FormBuilder, private servis: ZahteviService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.objekat = JSON.parse(localStorage.getItem('objekat'));
    this.servis.dohvatiZahtevZaKategorizaciju(this.korisnik.username, this.objekat.naziv).subscribe((zahtev: Zahtev)=>{
      this.zahtevZaKategorizaciju = zahtev;
      //alert(this.zahtevZaKategorizaciju.formular)
    })
  }


  uploadFile(event){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.formular = file;
    }
  }

  posalji(){
    if(this.formular){
      this.servis.unesiZahtevZaKategorizaciju(this.korisnik.username, this.objekat.naziv, this.formular).subscribe((poruka:any)=>{
        alert(poruka.message);
        this.router.navigate(['ugostitelj']);
      })
    }
    else{
      this.message = "Niste uneli formular, vratite se nazad!";
    }
    
  }

  @ViewChild('stepper') stepper: MatStepper;

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'number';
  }

}
