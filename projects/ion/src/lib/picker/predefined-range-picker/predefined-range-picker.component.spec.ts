/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('shoudl emit events', () => {
    const spy = jest.spyOn(component, 'handlePreDefinedRange');
    const event = { label: 'ultimos 7 dias', duration: 'P7D' };
    component.handlePreDefinedRange(event);
    expect(spy).toHaveBeenCalledWith(event);
  });
});
