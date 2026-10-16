import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielForm } from './materiel-form';

describe('MaterielForm', () => {
  let component: MaterielForm;
  let fixture: ComponentFixture<MaterielForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterielForm],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterielForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
