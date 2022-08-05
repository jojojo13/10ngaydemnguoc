import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneRequestPageComponent } from './view-one-request-page.component';

describe('ViewOneRequestPageComponent', () => {
  let component: ViewOneRequestPageComponent;
  let fixture: ComponentFixture<ViewOneRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOneRequestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
