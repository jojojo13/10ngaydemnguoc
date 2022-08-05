import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPdfFileComponent } from './show-pdf-file.component';

describe('ShowPdfFileComponent', () => {
  let component: ShowPdfFileComponent;
  let fixture: ComponentFixture<ShowPdfFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPdfFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPdfFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
