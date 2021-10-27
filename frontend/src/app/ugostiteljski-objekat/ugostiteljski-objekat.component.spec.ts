import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UgostiteljskiObjekatComponent } from './ugostiteljski-objekat.component';

describe('UgostiteljskiObjekatComponent', () => {
  let component: UgostiteljskiObjekatComponent;
  let fixture: ComponentFixture<UgostiteljskiObjekatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UgostiteljskiObjekatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UgostiteljskiObjekatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
