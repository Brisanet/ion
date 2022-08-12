import { Context } from './../core/types/context';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, screen } from '@testing-library/angular';
import { TagComponent, IonTagProps } from './tag.component';

const defaultValue: IonTagProps = {
  label: 'Default Message',
};

const IDs = {
  tag: 'ion-tag',
  icon: 'tag-icon',
};

const defaultColor = '#505566';

const tagTypes: Array<Context> = [
  'success',
  'neutral',
  'info',
  'warning',
  'negative',
];

const customColors = ['#be531c', '#ab2328', '#572d2d', '#6666ff', '#cc66ff'];

const sut = async (customProps: IonTagProps = defaultValue) => {
  await render(TagComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
    imports: [CommonModule],
  });
};

describe('TagComponent', () => {
  it('should render component', async () => {
    await sut();
    expect(screen.getByTestId(IDs.tag)).toBeInTheDocument();
  });

  it('should render without border for default', async () => {
    await sut();
    expect(screen.getByTestId(IDs.tag)).toHaveClass('outline');
  });

  it('should render default message', async () => {
    await sut();
    expect(screen.getByText(defaultValue.label)).toBeInTheDocument();
  });

  it('should render with default color', async () => {
    await sut();
    expect(screen.getByTestId(IDs.tag)).toHaveStyle(`color: ${defaultColor};`);
  });

  it('should render outline tag', async () => {
    await sut({ ...defaultValue, outline: true });
    expect(screen.getByTestId(IDs.tag)).not.toHaveClass('outline');
  });

  it.each(tagTypes)('should render %s tag', async (type) => {
    await sut({ ...defaultValue, context: type });
    expect(screen.getByTestId(IDs.tag)).toHaveClass(type);
  });

  it('should render icon', async () => {
    await sut();
    expect(screen.getByTestId(IDs.icon)).toBeInTheDocument();
  });

  it.each(customColors)(
    'should render tag with custom color: %s',
    async (color) => {
      await sut({ ...defaultValue, color: color });
      expect(await screen.findByTestId(IDs.tag)).toHaveStyle(
        `color: ${color};`
      );
    }
  );

  it.each(customColors)(
    'should render with custom backgroud: %s',
    async (color) => {
      await sut({ ...defaultValue, color: color });
      expect(await screen.findByTestId(IDs.tag)).toHaveStyle(
        `background: ${color}1A;`
      );
    }
  );
});
