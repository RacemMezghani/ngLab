import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterPubToMemberComponent } from './affecter-pub-to-member.component';

describe('AffecterPubToMemberComponent', () => {
  let component: AffecterPubToMemberComponent;
  let fixture: ComponentFixture<AffecterPubToMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterPubToMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterPubToMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
