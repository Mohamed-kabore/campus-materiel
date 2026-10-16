import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNouveau } from './gestion-nouveau';

describe('GestionNouveau', () => {
  let component: GestionNouveau;
  let fixture: ComponentFixture<GestionNouveau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionNouveau],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionNouveau);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
