import { render } from '@testing-library/angular';
import { RadioGroupComponent } from './radio-group.component';

const sut = async (customProps = {}): Promise<void> => {
  await render(RadioGroupComponent, {
    componentProperties: customProps,
  });
};

describe('RadioGroupComponent', () => {
  it('should create input with label', async () => {
    const labelText = 'Label';
    await sut({ label: labelText });
  });
});
