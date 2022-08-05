import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChildskillComponent } from './list-childskill.component';

describe('ListChildskillComponent', () => {
  let component: ListChildskillComponent;
  let fixture: ComponentFixture<ListChildskillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChildskillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChildskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
