import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfoundPagesComponent } from './notfound-pages.component';

describe('NotfoundPagesComponent', () => {
  let component: NotfoundPagesComponent;
  let fixture: ComponentFixture<NotfoundPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotfoundPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotfoundPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
