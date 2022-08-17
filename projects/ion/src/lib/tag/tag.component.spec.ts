import { TagStatus } from './../core/types';
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

const tagTypes: Array<TagStatus> = [
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
  describe('component basics', () => {
    beforeEach(async () => {
      await sut();
    });

    it('should render component', () => {
      expect(screen.getByTestId(IDs.tag)).toBeInTheDocument();
    });

    it('should render with border by default', () => {
      expect(screen.getByTestId(IDs.tag)).toHaveClass('outline');
    });

    it('should render default message', () => {
      expect(screen.getByText(defaultValue.label)).toBeInTheDocument();
    });

    it('should render with default color', () => {
      expect(screen.getByTestId(IDs.tag)).toHaveStyle(
        `color: ${defaultColor};`
      );
    });

    it('should render icon', () => {
      expect(screen.getByTestId(IDs.icon)).toBeInTheDocument();
    });
  });

  it('should render custom message', async () => {
    const customMessage = 'Testing tag component';
    await sut({ label: customMessage });
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it('should render tag without border', async () => {
    await sut({ ...defaultValue, outline: false });
    expect(screen.getByTestId(IDs.tag)).not.toHaveClass('outline');
  });

  it.each(tagTypes)('should render %s tag', async (type) => {
    await sut({ ...defaultValue, status: type });
    expect(screen.getByTestId(IDs.tag)).toHaveClass(type);
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

  it.each(tagTypes)('should render %s tag even with a color', async (type) => {
    await sut({ ...defaultValue, status: type, color: '#be531c' });
    expect(screen.getByTestId(IDs.tag)).toHaveClass(type);
    expect(await screen.findByTestId(IDs.tag)).not.toHaveStyle(
      'color: #be531c;'
    );
  });
});
