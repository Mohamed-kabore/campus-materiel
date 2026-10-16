import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModifier } from './gestion-modifier';

describe('GestionModifier', () => {
  let component: GestionModifier;
  let fixture: ComponentFixture<GestionModifier>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionModifier],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionModifier);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
