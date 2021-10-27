import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UgostiteljComponent } from './ugostitelj.component';

describe('UgostiteljComponent', () => {
  let component: UgostiteljComponent;
  let fixture: ComponentFixture<UgostiteljComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UgostiteljComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UgostiteljComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
