import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsermangeComponent } from './admin-usermange.component';

describe('AdminUsermangeComponent', () => {
  let component: AdminUsermangeComponent;
  let fixture: ComponentFixture<AdminUsermangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsermangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsermangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
