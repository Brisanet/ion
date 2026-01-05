import { render, screen } from '@testing-library/angular';
import { IonTagComponent } from './ion-tag.component';
import { TagStatus } from '../core/types';
import { IonIconComponent } from '../icon/icon.component';

const defaultValue = {
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

const sut = async (
  customProps: Partial<{
    label: string;
    outline: boolean;
    status: TagStatus;
    color: string;
    backgroundColor: string;
    icon: string;
  }> = defaultValue,
): Promise<void> => {
  await render(IonTagComponent, {
    componentInputs: customProps,
    imports: [IonIconComponent],
  });
};

describe('IonTagComponent', () => {
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
        `color: ${defaultColor};`,
      );
    });

    it('should render without icon by default', () => {
      expect(screen.queryAllByTestId(IDs.icon)).toHaveLength(0);
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
        `color: ${color};`,
      );
    },
  );

  it.each(customColors)(
    'should render with custom backgroud: %s',
    async (color) => {
      await sut({ ...defaultValue, color: color });
      expect(await screen.findByTestId(IDs.tag)).toHaveStyle(
        `background: ${color}1A;`,
      );
    },
  );

  it('should render with icon', async () => {
    await sut({ ...defaultValue, icon: 'pencil' });
    expect(screen.getByTestId(IDs.icon)).toBeInTheDocument();
  });

  it('should not render icon when parameter is empty', async () => {
    await sut({ ...defaultValue, icon: '' });
    expect(screen.queryAllByTestId(IDs.icon)).toHaveLength(0);
  });

  it.each(tagTypes)('should render %s tag even with a color', async (type) => {
    const color = '#be531c';
    await sut({ ...defaultValue, status: type, color: color });
    expect(screen.getByTestId(IDs.tag)).toHaveClass(type);
    expect(await screen.findByTestId(IDs.tag)).not.toHaveStyle(
      `color: ${color};`,
    );
  });

  it('should create tag whit default color when color parameter is invalid', async () => {
    const invalid_color = '#GGGGGG';
    await sut({ ...defaultValue, color: invalid_color });
    expect(screen.getByTestId(IDs.tag)).toHaveStyle(`color: ${defaultColor};`);
  });

  it.each(customColors)(
    'should render with background color derived from custom color: %s',
    async (color) => {
      await sut({ ...defaultValue, color: color });
      expect(await screen.findByTestId(IDs.tag)).toHaveStyle(
        `background: ${color}1A;`,
      );
    },
  );

  it.each(customColors)(
    'should render with a specific custom background color: %s',
    async (backgroundColor) => {
      await sut({ ...defaultValue, backgroundColor: backgroundColor });
      expect(await screen.findByTestId(IDs.tag)).toHaveStyle(
        `background: ${backgroundColor};`,
      );
    },
  );

  it('should use default background color when an invalid background color is provided', async () => {
    const invalidColor = 'invalid-color';
    await sut({ ...defaultValue, backgroundColor: invalidColor });
    expect(screen.getByTestId(IDs.tag)).toHaveStyle(
      `background: ${defaultColor}1A;`,
    );
  });

  it('should not apply a custom background color when a status is defined', async () => {
    const backgroundColor = '#19243B';
    await sut({
      ...defaultValue,
      status: 'success',
      backgroundColor: backgroundColor,
    });
    expect(screen.getByTestId(IDs.tag)).not.toHaveStyle(
      `background: ${backgroundColor};`,
    );
    expect(screen.getByTestId(IDs.tag)).toHaveStyle('background:;');
  });
});
