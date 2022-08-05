import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformaionComponent } from './informaion.component';

describe('InformaionComponent', () => {
  let component: InformaionComponent;
  let fixture: ComponentFixture<InformaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformaionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
