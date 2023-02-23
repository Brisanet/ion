import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { StepConfig, StepType } from '../core/types/steps';
import { IonIconComponent } from '../icon/icon.component';
import { IonStepsComponent } from './step.component';

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
  await render(IonStepsComponent, {
    componentProperties: {
      current: customProps.current,
      steps: customProps.steps,
      clickable: customProps.clickable,
      disabled: customProps.disabled,
    },
    declarations: [IonIconComponent],
    imports: [FormsModule],
  });
  return screen.findByTestId('ion-steps');
};

describe('Static IonStepsComponent', () => {
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
    expect(screen.getByTestId('step-1-checked')).toHaveClass('checked');
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
    expect(screen.getByTestId('step-1-checked')).toHaveClass('checked');
    expect(screen.getByTestId('step-2-error')).toBeTruthy();
    expect(screen.getByTestId('step-2-error')).toHaveClass('error');
    expect(screen.getByText('Error')).toHaveClass(`description`);
  });
  const checkedStepsIds = [
    'step-1-checked',
    'step-2-checked',
    'step-3-checked',
  ];
  it.each(checkedStepsIds)(
    'should render step component with 3 checked steps',
    async (stepId: string) => {
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
      expect(screen.getByTestId(stepId)).toBeTruthy();
      expect(screen.getByTestId(stepId)).toHaveClass('checked');
    }
  );
  it('should go to step 3 when it be clicked', async () => {
    await sut({
      clickable: true,
      disabled: false,
      current: 1,
      steps: defaultValue,
    });
    fireEvent.click(screen.getByTestId('step-3-default'));
    expect(screen.findByTestId('step-3-selected')).toBeTruthy();
    expect(screen.getByTestId('step-3-selected')).toHaveClass('selected');
  });
});

@Component({
  template: `<ion-steps [steps]="steps" [current]="current"></ion-steps>`,
})
class TestHostComponent {
  steps: StepType[] = defaultValue;
  current = 1;
}

describe('Passing through the IonStepsComponent', () => {
  let fixture, testHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IonStepsComponent, TestHostComponent, IonIconComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should pass from step 1 to step 2', async () => {
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
    expect(screen.getByTestId('step-2-default')).toBeTruthy();
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
