/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonSelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: IonSelectComponent;
  let fixture: ComponentFixture<IonSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IonSelectComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
