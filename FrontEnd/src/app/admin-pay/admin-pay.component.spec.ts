import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPayComponent } from './admin-pay.component';

describe('AdminPayComponent', () => {
  let component: AdminPayComponent;
  let fixture: ComponentFixture<AdminPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
