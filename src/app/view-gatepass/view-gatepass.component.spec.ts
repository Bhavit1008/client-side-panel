import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGatepassComponent } from './view-gatepass.component';

describe('ViewGatepassComponent', () => {
  let component: ViewGatepassComponent;
  let fixture: ComponentFixture<ViewGatepassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGatepassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGatepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
