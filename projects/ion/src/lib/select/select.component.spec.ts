/* tslint:disable:no-unused-variable */

import { IonSelectComponent } from './select.component';
import { IonInputModule } from '../input/input.module';
import { IonIconModule } from '../icon/icon.module';
import { IonDropdownModule } from '../dropdown/dropdown.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/angular';
import { IonSelecProps } from '../core/types/select';

const getInput = async (): Promise<HTMLInputElement> =>
  (await screen.getByTestId('input-element')) as HTMLInputElement;

describe('dropdown visibility in select component', () => {
  let selectComponent: IonSelectComponent;
  let fixture: ComponentFixture<IonSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IonSelectComponent],
      imports: [IonDropdownModule, IonInputModule, IonIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonSelectComponent);
    selectComponent = fixture.componentInstance;
  });

  it('should update showDropdown for false when dispatch event mouseup', () => {
    selectComponent.options = [{ label: 'test' }];
    selectComponent.showDropdown = false;
    selectComponent.toggleDropdown();
    fixture.detectChanges();
    expect(selectComponent.showDropdown).toBeTruthy();

    document.dispatchEvent(new Event('mouseup'));
    expect(selectComponent.showDropdown).not.toBeTruthy();
  });

  it('should keep showDropdown as true when disableVisibilityToggle for true and dispatch event mouseup ', () => {
    selectComponent.options = [{ label: 'test' }];
    selectComponent.disableVisibilityToggle = true;
    selectComponent.showDropdown = false;
    selectComponent.toggleDropdown();
    fixture.detectChanges();
    expect(selectComponent.showDropdown).toBeTruthy();

    document.dispatchEvent(new Event('mouseup'));
    expect(selectComponent.showDropdown).toBeTruthy();
  });

  it('should correctly updates label when the selected option changes', async () => {
    const customOptions = [
      { label: 'Fiat', selected: true },
      { label: 'Toyota', selected: false },
    ];

    selectComponent.options = customOptions;
    fixture.autoDetectChanges();
    expect(selectComponent.inputValue).toBe('Fiat');

    selectComponent.options[0].selected = false;
    selectComponent.options[1].selected = true;
    selectComponent.updateLabel();
    expect(selectComponent.inputValue).toBe('Toyota');
  });
});

const sut = async (
  customProps?: IonSelecProps
): Promise<RenderResult<IonSelectComponent>> => {
  return await render(IonSelectComponent, {
    componentProperties: customProps,
    imports: [IonInputModule, IonIconModule, IonDropdownModule],
  });
};

describe('choosing options', () => {
  it('should render default placeholder', async () => {
    await sut();
    const input = await getInput();
    expect(input).toHaveAttribute('placeholder', 'choose');
  });

  it('should render custom placeholder', async () => {
    const placeholder = 'Custom placeholder';
    await sut({ placeholder });
    const input = await getInput();
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should render label of the selected option', async () => {
    await sut({ options: [{ label: 'option 01' }, { label: 'option 02' }] });
    fireEvent.click(await getInput());
    fireEvent.click(document.getElementById('option-0'));
    expect((await getInput()).value).toBe('option 01');
  });
});
