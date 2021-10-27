import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjekatPregledComponent } from './objekat-pregled.component';

describe('ObjekatPregledComponent', () => {
  let component: ObjekatPregledComponent;
  let fixture: ComponentFixture<ObjekatPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjekatPregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjekatPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
