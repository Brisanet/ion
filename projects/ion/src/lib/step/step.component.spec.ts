import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { StepComponent, StepConfig, StepType } from './step.component';

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

const defaultProps: StepConfig = {
  current: 1,
  steps: defaultValue,
};

const sut = async (
  customProps: StepConfig = defaultProps
): Promise<HTMLElement> => {
  await render(StepComponent, {
    componentProperties: {
      current: customProps.current,
      steps: customProps.steps,
      clickable: customProps.clickable,
      disabled: customProps.disabled,
    },
    declarations: [IonIconComponent],
    imports: [FormsModule],
  });
  return screen.findByTestId('ion-step');
};

describe('Static StepComponent', () => {
  const stepsLabels = ['Step 1', 'Step 2', 'Step 3'];

  it.each(stepsLabels)(
    'should render step component with 3 steps',
    async (label: string) => {
      await sut();
      expect(screen.getByText(label)).toBeTruthy();
    }
  );
  it('should render first checked', async () => {
    await sut({
      current: defaultProps.current,
      steps: [
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
      ],
    });
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
  });
  it('should render first step checked and second with error and description', async () => {
    await sut({
      current: defaultProps.current,
      steps: [
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
      ],
    });
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-2-error')).toBeTruthy();
    expect(screen.getByText('Error')).toHaveClass(`description`);
  });
  it('should render step component with 3 checked steps', async () => {
    await sut({
      current: defaultProps.current,
      steps: [
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
      ],
    });
    expect(screen.getAllByTestId('check-icon')).toHaveLength(3);
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-2-checked')).toBeTruthy();
    expect(screen.getByTestId('step-3-checked')).toBeTruthy();
  });
  it('should go to step 3 when it be clicked', async () => {
    await sut({
      clickable: true,
      disabled: false,
      current: 1,
      steps: defaultValue,
    });
    const step = await screen.findByTestId('step-3-default');
    expect(step).toBeTruthy();
    fireEvent.click(step);
    // const stepSelected = await screen.findByTestId('step-3-selected');
    // expect(stepSelected).toBeTruthy();
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
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-2-selected')).toBeTruthy();
  });
  it('should back from step 2 to step 1', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 1;
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
    expect(screen.getByTestId('step-2-default')).toBeTruthy();
  });
  it('should to keep last step selected when try to pass forward', async () => {
    fixture.detectChanges();
    testHost.current = 2;
    fixture.detectChanges();
    testHost.current = 3;
    fixture.detectChanges();
    testHost.current = 4;
    fixture.detectChanges();
    expect(screen.getByTestId('step-3-selected')).toBeTruthy();
  });
});
