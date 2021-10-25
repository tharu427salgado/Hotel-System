import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayInfoComponent } from './admin-pay-info.component';

describe('AdminPayInfoComponent', () => {
  let component: AdminPayInfoComponent;
  let fixture: ComponentFixture<AdminPayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPayInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
