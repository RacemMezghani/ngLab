import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterToolToMemberComponent } from './affecter-tool-to-member.component';

describe('AffecterToolToMemberComponent', () => {
  let component: AffecterToolToMemberComponent;
  let fixture: ComponentFixture<AffecterToolToMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterToolToMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterToolToMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
