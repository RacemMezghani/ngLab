import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterEventToMemberComponent } from './affecter-event-to-member.component';

describe('AffecterEventToMemberComponent', () => {
  let component: AffecterEventToMemberComponent;
  let fixture: ComponentFixture<AffecterEventToMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterEventToMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterEventToMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
