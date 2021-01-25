import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistreComponent } from './member-registre.component';

describe('MemberRegistreComponent', () => {
  let component: MemberRegistreComponent;
  let fixture: ComponentFixture<MemberRegistreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberRegistreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegistreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
