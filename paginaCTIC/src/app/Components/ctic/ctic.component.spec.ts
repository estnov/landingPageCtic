import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CticComponent } from './ctic.component';

describe('CticComponent', () => {
  let component: CticComponent;
  let fixture: ComponentFixture<CticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
