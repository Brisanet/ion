import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import {
  IonPaginationProps,
  PaginationComponent,
} from './pagination.component';

const defaultComponent: IonPaginationProps = {
  total: 46,
};

const sut = async (customProps: IonPaginationProps = defaultComponent) => {
  await render(PaginationComponent, {
    componentProperties: customProps,
    declarations: [ButtonComponent, IonIconComponent],
  });
};

const obj = {
  'internet 100': {
    cat: 'internet',
  },
};

describe('PaginationComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it.each(['1', '2', '3', '4'])(
    'should render page %s',
    async (page: string) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    }
  );

  it('should be selected in fitst page by default', async () => {
    expect(screen.getByTestId('page-1')).toHaveClass('selected');
  });

  it.each(['left', 'right'])(
    'should render arrow %s',
    async (direction: string) => {
      expect(screen.getByTestId(`arrow-${direction}`)).toBeInTheDocument();
    }
  );

  it('should select a other page', async () => {
    const pageTwo = screen.getByTestId('page-2');
    fireEvent.click(pageTwo);
    expect(pageTwo).toHaveClass('selected');
    expect(screen.getByTestId('page-1')).not.toHaveClass('selected');
    screen.debug();
  });

  it('should render arrow left disabled when in first page', async () => {
    expect(screen.getByTestId('arrow-left')).toBeDisabled();
  });

  it('should render arrow right enabled when have more pages', async () => {
    expect(screen.getByTestId('arrow-right')).toBeEnabled();
  });
});
