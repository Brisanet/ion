import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { StepConfig, StepStatus, StepType } from '../core/types/steps';
import { IonIconComponent } from '../icon/icon.component';
import { PipesModule } from '../utils/pipes/pipes.module';
import { SafeAny } from '../utils/safe-any';
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
): Promise<RenderResult<IonStepsComponent, IonStepsComponent>> => {
  return await render(IonStepsComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
    imports: [FormsModule, PipesModule],
  });
};

describe('Static IonStepsComponent', () => {
  const stepsLabels = ['Step 1', 'Step 2', 'Step 3'];

  it('should render step in horizontal direction by default', async () => {
    await sut();
    expect(screen.getByTestId('ion-steps')).toHaveClass(
      'step-direction-horizontal'
    );
  });

  it('should render step in vertical direction', async () => {
    await sut({ ...defaultProps, direction: 'vertical' });
    expect(screen.getByTestId('ion-steps')).toHaveClass(
      'step-direction-vertical'
    );
  });

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
          status: StepStatus.CHECKED,
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
    expect(screen.getByTestId('step-1-checked')).toHaveClass(
      StepStatus.CHECKED
    );
  });
  it('should render first step checked and second with error and description', async () => {
    await sut({
      current: defaultProps.current,
      steps: [
        {
          label: 'Step 1',
          status: StepStatus.CHECKED,
        },
        {
          label: 'Step 2',
          status: StepStatus.ERROR,
          description: 'Error',
        },
        {
          label: 'Step 3',
        },
      ],
    });
    expect(screen.getByTestId('step-1-checked')).toBeTruthy();
    expect(screen.getByTestId('step-1-checked')).toHaveClass(
      StepStatus.CHECKED
    );
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
            status: StepStatus.CHECKED,
          },
          {
            label: 'Step 2',
            status: StepStatus.CHECKED,
          },
          {
            label: 'Step 3',
            status: StepStatus.CHECKED,
          },
        ],
      });
      expect(screen.getByTestId(stepId)).toBeTruthy();
      expect(screen.getByTestId(stepId)).toHaveClass(StepStatus.CHECKED);
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
  it('should disable only the "Step 3"', async () => {
    const steps: StepType[] = JSON.parse(JSON.stringify(defaultValue));
    steps[2].disabled = true;

    await sut({
      disabled: false,
      current: 1,
      steps,
    });
    expect(screen.getByTestId('step-1-selected')).not.toHaveClass('disabled');
    expect(screen.getByTestId('step-2-default')).not.toHaveClass('disabled');
    expect(screen.getByTestId('step-3-default')).toHaveClass('disabled');
  });

  it('should emit event when step 3 be clicked', async () => {
    const steps: StepType[] = JSON.parse(JSON.stringify(defaultValue));
    const indexChange = jest.fn();
    await sut({
      disabled: false,
      clickable: true,
      current: 1,
      steps,
      indexChange: {
        emit: indexChange,
      } as SafeAny,
    });
    userEvent.click(screen.getByTestId('step-3-default'));
    expect(indexChange).toHaveBeenCalled();
  });

  it('should not emit event when step 3 is disabled', async () => {
    const steps: StepType[] = JSON.parse(JSON.stringify(defaultValue));
    steps[2].disabled = true;
    const indexChange = jest.fn();
    await sut({
      disabled: false,
      current: 1,
      clickable: true,
      steps,
      indexChange: {
        emit: indexChange,
      } as SafeAny,
    });
    fireEvent.click(screen.getByTestId('step-3-default'));
    expect(indexChange).not.toHaveBeenCalled();
  });
});

@Component({
  template: `<ion-steps
    [steps]="steps"
    [current]="current"
    [preventStepChange]="preventStepChange"
  ></ion-steps>`,
})
class TestHostComponent {
  preventStepChange = false;
  steps: StepType[] = defaultValue;
  current = 1;
}

describe('Passing through the IonStepsComponent', () => {
  let fixture, testHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PipesModule],
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

  it("shouldn't pass to other step when preventStepChange is true", async () => {
    testHost.preventStepChange = true;
    fixture.detectChanges();
    fireEvent.click(screen.getByTestId('step-2-default'));
    fixture.detectChanges();
    expect(screen.getByTestId('step-1-selected')).toBeTruthy();
    expect(screen.getByTestId('step-2-default')).toBeTruthy();
  });

  it('should render steps when steps change', async () => {
    testHost.steps = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];
    fixture.detectChanges();
    const newSteps = [
      { label: 'Step 4' },
      { label: 'Step 5' },
      { label: 'Step 6' },
    ];
    testHost.steps = newSteps;
    fixture.detectChanges();
    newSteps.forEach((step) => {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    });
  });
  it('should render error on change step config', async () => {
    testHost.steps = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];
    fixture.detectChanges();
    testHost.steps[2].status = StepStatus.ERROR;
    testHost.steps = JSON.parse(JSON.stringify(testHost.steps));
    fixture.detectChanges();
    expect(screen.getByTestId('step-3-error')).toBeInTheDocument();
  });
});
