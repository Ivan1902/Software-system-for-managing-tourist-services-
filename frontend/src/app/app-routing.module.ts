import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { KategorizacijaIzmenaComponent } from './kategorizacija-izmena/kategorizacija-izmena.component';
import { KategorizacijaComponent } from './kategorizacija/kategorizacija.component';
import { KorisnikIzmenaComponent } from './korisnik-izmena/korisnik-izmena.component';
import { LoginComponent } from './login/login.component';
import { ObjekatIzmenaComponent } from './objekat-izmena/objekat-izmena.component';
import { ObjekatPregledComponent } from './objekat-pregled/objekat-pregled.component';
import { OvlasceniComponent } from './ovlasceni/ovlasceni.component';
import { TuristaIzmenaComponent } from './turista-izmena/turista-izmena.component';
import { UgostiteljComponent } from './ugostitelj/ugostitelj.component';
import { UgostiteljskiObjekatComponent } from './ugostiteljski-objekat/ugostiteljski-objekat.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"admin", component: AdminComponent},
  {path:"ugostitelj", component: UgostiteljComponent},
  {path:"ugostiteljski-objekat", component: UgostiteljskiObjekatComponent},
  {path:"objekat-pregled", component: ObjekatPregledComponent},
  {path:"objekat-izmena", component: ObjekatIzmenaComponent},
  {path:"kategorizacija", component: KategorizacijaComponent},
  {path:"kategorizacija-izmena", component: KategorizacijaIzmenaComponent},
  {path:"ovlasceni", component: OvlasceniComponent},
  {path:"turista-izmena", component: TuristaIzmenaComponent},
  {path:"korisnik-izmena", component: KorisnikIzmenaComponent},
  {path:"", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


