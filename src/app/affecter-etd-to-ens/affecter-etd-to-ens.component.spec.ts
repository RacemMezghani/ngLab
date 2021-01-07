import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterEtdToEnsComponent } from './affecter-etd-to-ens.component';

describe('AffecterEtdToEnsComponent', () => {
  let component: AffecterEtdToEnsComponent;
  let fixture: ComponentFixture<AffecterEtdToEnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterEtdToEnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffecterEtdToEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
