import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { StepComponent, StepType } from './step.component';

const defaultValue: StepType[] = [
  {
    label: 'Step 1',
  },
  {
    label: 'Step 2',
  },
  {
    label: 'Step 3',
  },
];

describe('Static StepComponent', () => {
  const sut = async (
    customProps: StepType[] = defaultValue
  ): Promise<HTMLElement> => {
    await render(StepComponent, {
      componentProperties: {
        steps: customProps,
      },
      declarations: [IonIconComponent],
      imports: [FormsModule],
    });
    return screen.findByTestId('ion-step');
  };

  it('should render step component with 3 steps', async () => {
    await sut();
    expect(screen.getByText('Step 3')).toBeTruthy();
  });
  it('should render step component with 3 steps, first checked', async () => {
    await sut([
      {
        label: 'Step 1',
        status: 'checked',
      },
      {
        label: 'Step 2',
      },
      {
        label: 'Step 3',
      },
    ]);
    expect(
      screen.getByText('Step 3') && screen.getByTestId('step-1-checked')
    ).toBeTruthy();
  });
  it('should render step component with 3 steps, first checked and second with error and description', async () => {
    await sut([
      {
        label: 'Step 1',
        status: 'checked',
      },
      {
        label: 'Step 2',
        status: 'error',
        description: 'Error',
      },
      {
        label: 'Step 3',
      },
    ]);
    expect(
      screen.getByText('Step 3') &&
        screen.getByTestId('step-1-checked') &&
        screen.getByTestId('step-2-error') &&
        screen.getByTestId('description-2')
    ).toBeTruthy();
  });
  it('should render step component with 3 checked steps', async () => {
    await sut([
      {
        label: 'Step 1',
        status: 'checked',
      },
      {
        label: 'Step 2',
        status: 'checked',
      },
      {
        label: 'Step 3',
        status: 'checked',
      },
    ]);
    expect(screen.getAllByTestId('check-icon')).toHaveLength(3);
    expect(screen.getByText('Step 3')).toBeTruthy();
  });
});

@Component({
  template: `<ion-step [steps]="steps" [current]="current"></ion-step>`,
})
class TestHostComponent {
  steps: StepType[] = defaultValue;
  current = 1;
}

describe('Passing through the StepComponent', () => {
  let fixture, testHost;

  const sut = async (
    customProps: StepType[] = defaultValue,
    index = 1
  ): Promise<HTMLElement> => {
    await render(StepComponent, {
      componentProperties: {
        steps: customProps,
        current: index,
      },
      declarations: [IonIconComponent],
      imports: [FormsModule],
    });
    return screen.findByTestId('ion-step');
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepComponent, TestHostComponent, IonIconComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should pass from step 1 to step 2', async () => {
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
    testHost.current = 2;
    fixture.detectChanges();
    expect(screen.getByTestId('step-2-selected')).toBeTruthy();
  });
  it('should back from step 2 to step 1', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 1;
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
  });
  it('should to keep last step selected when try to pass forward', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 8;
    fixture.detectChanges();
    expect(screen.getByTestId('step-3-selected')).toBeTruthy();
  });
});
