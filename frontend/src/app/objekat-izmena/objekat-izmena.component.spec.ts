import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjekatIzmenaComponent } from './objekat-izmena.component';

describe('ObjekatIzmenaComponent', () => {
  let component: ObjekatIzmenaComponent;
  let fixture: ComponentFixture<ObjekatIzmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjekatIzmenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjekatIzmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
