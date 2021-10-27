import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorizacijaComponent } from './kategorizacija.component';

describe('KategorizacijaComponent', () => {
  let component: KategorizacijaComponent;
  let fixture: ComponentFixture<KategorizacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategorizacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorizacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
