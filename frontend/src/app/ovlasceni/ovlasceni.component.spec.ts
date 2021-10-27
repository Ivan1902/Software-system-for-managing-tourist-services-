import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvlasceniComponent } from './ovlasceni.component';

describe('OvlasceniComponent', () => {
  let component: OvlasceniComponent;
  let fixture: ComponentFixture<OvlasceniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvlasceniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvlasceniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
