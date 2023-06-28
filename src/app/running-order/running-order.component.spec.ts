import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningOrderComponent } from './running-order.component';

describe('RunningOrderComponent', () => {
  let component: RunningOrderComponent;
  let fixture: ComponentFixture<RunningOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
