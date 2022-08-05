import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCategoryPageComponent } from './contract-category-page.component';

describe('ContractCategoryPageComponent', () => {
  let component: ContractCategoryPageComponent;
  let fixture: ComponentFixture<ContractCategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCategoryPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
