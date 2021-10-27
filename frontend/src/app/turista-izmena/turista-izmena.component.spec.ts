import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuristaIzmenaComponent } from './turista-izmena.component';

describe('TuristaIzmenaComponent', () => {
  let component: TuristaIzmenaComponent;
  let fixture: ComponentFixture<TuristaIzmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuristaIzmenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuristaIzmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
