/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';
import { IonPredefinedRangePickerComponent } from './predefined-range-picker.component';
import { IonDatePickerModule } from '../date-picker/date-picker.module';

describe('PredefinedRangePickerComponent', () => {
  let component: IonPredefinedRangePickerComponent;
  let fixture: ComponentFixture<IonPredefinedRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonDatePickerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonPredefinedRangePickerComponent);
    component = fixture.componentInstance;
  });

  it('should render component', async () => {
    expect(await screen.findByTestId('chip-range')).toBeInTheDocument();
  });
});
