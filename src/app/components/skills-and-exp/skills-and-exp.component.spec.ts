import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsAndExpComponent } from './skills-and-exp.component';

describe('SkillsAndExpComponent', () => {
  let component: SkillsAndExpComponent;
  let fixture: ComponentFixture<SkillsAndExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsAndExpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsAndExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
