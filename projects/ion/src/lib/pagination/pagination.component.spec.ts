import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent } from '../button/button.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from '../badge/badge.component';
import { IonIconComponent } from '../icon/icon.component';
import { SafeAny } from '../utils/safe-any';
import {
  IonPaginationProps,
  PaginationComponent,
} from './pagination.component';

const pageEvent = jest.fn();
const defaultComponent: IonPaginationProps = {
  total: 46,
  events: {
    emit: pageEvent,
  } as SafeAny,
};

const sut = async (
  customProps: IonPaginationProps = defaultComponent
): Promise<void> => {
  await render(PaginationComponent, {
    componentProperties: customProps,
    declarations: [
      ButtonComponent,
      IonIconComponent,
      DropdownComponent,
      BadgeComponent,
    ],
    imports: [FormsModule],
  });
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
  });

  it('should render arrow right enabled when have more pages', async () => {
    expect(screen.getByTestId('arrow-right')).toBeEnabled();
  });

  it('should render arrow left enabled when has previous page', async () => {
    fireEvent.click(screen.getByTestId('page-2'));
    expect(screen.getByTestId('arrow-left')).toBeEnabled();
  });

  it('should go to the previous page when click in arrow left', async () => {
    fireEvent.click(screen.getByTestId('page-3'));
    fireEvent.click(screen.getByTestId('arrow-left'));
    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });

  it('should go to the next page when click in arrow right', async () => {
    fireEvent.click(screen.getByTestId('arrow-right'));
    expect(screen.getByTestId('page-2')).toHaveClass('selected');
  });

  it('should not show items per page by default', async () => {
    expect(screen.queryAllByText('10 / página')).toHaveLength(0);
  });

  afterEach(() => {
    pageEvent.mockClear();
  });
});

describe('Pagination > Events', () => {
  it('should emit the page selected when selected page', async () => {
    const event = jest.fn();
    await sut({
      total: 16,
      events: {
        emit: event,
      } as SafeAny,
    });
    fireEvent.click(screen.getByTestId('page-2'));
    expect(event).toBeCalledTimes(2);
  });

  it('should show items per page 10 when params is informed', async () => {
    await sut({
      total: 16,
      allowChangeQtdItems: true,
    });
    expect(screen.queryAllByText('10 / página')).toHaveLength(1);
  });

  it('should change total pages when change items per page', async () => {
    await sut({
      total: 46,
      allowChangeQtdItems: true,
    });

    fireEvent.click(screen.getByTestId('btn-select'));
    fireEvent.click(screen.getByText('20 / página'));

    expect(screen.queryAllByTestId('page-4')).toHaveLength(0);
  });
});
