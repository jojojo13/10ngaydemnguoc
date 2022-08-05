import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationListComponent } from './nation-list.component';

describe('NationListComponent', () => {
  let component: NationListComponent;
  let fixture: ComponentFixture<NationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
