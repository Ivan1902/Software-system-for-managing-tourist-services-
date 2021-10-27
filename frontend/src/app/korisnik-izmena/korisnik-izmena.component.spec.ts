import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikIzmenaComponent } from './korisnik-izmena.component';

describe('KorisnikIzmenaComponent', () => {
  let component: KorisnikIzmenaComponent;
  let fixture: ComponentFixture<KorisnikIzmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikIzmenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikIzmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
