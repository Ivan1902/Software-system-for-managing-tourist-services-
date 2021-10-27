import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../korisnici.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private korisniciServis: KorisniciService, private router: Router) { }


  ngOnInit(): void {
  }
  
  username: String;
  password: String;
  message: String;

  login(){
    if(!this.username || !this.password){
      this.message = "Sva polja moraju biti popunjena!";
      return;
    }
    this.korisniciServis.login(this.username, this.password).subscribe((result: {message: string, korisnik: Korisnik})=>{
      if(result.message=='ok'){
        let korisnik : Korisnik = result.korisnik;
          localStorage.setItem("ulogovan", JSON.stringify(korisnik));
          if(korisnik.tip == "admin"){
            this.router.navigate(['admin']);
          }
          else if(korisnik.tip == "ovlasceni"){
            this.router.navigate(['ovlasceni']);
          }
          else{
            this.router.navigate(['ugostitelj']);
          }
        
      }
      
      else{
        this.message = result.message;
      }
    })

  }

}
