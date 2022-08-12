/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IonTagComponent } from './ion-tag.component';

describe('IonTagComponent', () => {
  let component: IonTagComponent;
  let fixture: ComponentFixture<IonTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IonTagComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
