import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportInfoComponent } from './admin-report-info.component';

describe('AdminReportInfoComponent', () => {
  let component: AdminReportInfoComponent;
  let fixture: ComponentFixture<AdminReportInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReportInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
