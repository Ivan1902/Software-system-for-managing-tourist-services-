import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Objekat } from '../models/objekat';
import {Location} from '@angular/common';

@Component({
  selector: 'app-objekat-pregled',
  templateUrl: './objekat-pregled.component.html',
  styleUrls: ['./objekat-pregled.component.css']
})
export class ObjekatPregledComponent implements OnInit {

  objekat: Objekat;
  slika: string;
  counter: number;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(config: NgbCarouselConfig, private router: Router, private location: Location) {
    
   }

  ngOnInit(): void {
    this.objekat = JSON.parse(localStorage.getItem('objekat'));
    this.slika = this.objekat.slike[0];
    this.counter = 0;
  }

  next (){
    this.slika = this.objekat.slike[(((++this.counter) % this.objekat.slike.length) + this.objekat.slike.length ) % this.objekat.slike.length ]
  }

  previous (){
    this.slika = this.objekat.slike[(((--this.counter) % this.objekat.slike.length) + this.objekat.slike.length ) % this.objekat.slike.length]
  }

  nazad(){
    localStorage.removeItem('objekat');
    this.location.back();
  }
}
