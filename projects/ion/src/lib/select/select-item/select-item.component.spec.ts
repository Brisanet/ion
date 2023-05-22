/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonSelectItemComponent } from './select-item.component';
import { IonIconModule } from '../../icon/icon.module';

describe('SelectItemComponent', () => {
  let component: IonSelectItemComponent;
  let fixture: ComponentFixture<IonSelectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IonSelectItemComponent],
      imports: [IonIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
