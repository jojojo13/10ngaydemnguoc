import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfComponent } from './general-inf.component';

describe('GeneralInfComponent', () => {
  let component: GeneralInfComponent;
  let fixture: ComponentFixture<GeneralInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
