import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorizacijaIzmenaComponent } from './kategorizacija-izmena.component';

describe('KategorizacijaIzmenaComponent', () => {
  let component: KategorizacijaIzmenaComponent;
  let fixture: ComponentFixture<KategorizacijaIzmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategorizacijaIzmenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorizacijaIzmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
