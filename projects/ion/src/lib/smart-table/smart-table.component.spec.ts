import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableComponent } from './smart-table.component';

describe('SmartTableComponent', () => {
  let component: SmartTableComponent;
  let fixture: ComponentFixture<SmartTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SmartTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
