import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { ZahteviService } from '../zahtevi.service';

@Component({
  selector: 'app-kategorizacija',
  templateUrl: './kategorizacija.component.html',
  styleUrls: ['./kategorizacija.component.css']
})
export class KategorizacijaComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  korisnik: Korisnik;
  objekat: Objekat;
  formular: any;
  message: string;

  constructor(private _formBuilder: FormBuilder, private servis: ZahteviService, private router: Router) { }

  ngOnInit(): void {
    

    
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.objekat = JSON.parse(localStorage.getItem('objekat'));
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
