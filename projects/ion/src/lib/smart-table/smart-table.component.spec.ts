import { render, screen, fireEvent } from '@testing-library/angular';
import { IonSmartTableComponent } from './smart-table.component';
import { ConfigSmartTable } from '../core/types';
import { SafeAny } from '../utils/safe-any';

const columns = [
  { label: 'ID', key: 'id', sort: true },
  { label: 'Name', key: 'name', sort: true },
];

const data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

const pagination = {
  total: 2,
  itemsPerPage: 10,
  page: 1,
};

const config: ConfigSmartTable<SafeAny> = {
  data,
  columns,
  pagination,
  check: true,
};

describe('IonSmartTableComponent', () => {
  it('should render smart table', async () => {
    await render(IonSmartTableComponent, {
      componentInputs: {
        config,
      },
    });
    expect(screen.getByTestId('ion-table')).toBeTruthy();
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();
  });

  it('should emit sort event', async () => {
    const { fixture } = await render(IonSmartTableComponent, {
      componentInputs: {
        config,
      },
    });
    const component = fixture.componentInstance;
    let emittedEvent: SafeAny;
    component.events.subscribe((event) => (emittedEvent = event));

    const sortButton = screen.getByTestId('sort-by-name');
    fireEvent.click(sortButton);

    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent.event).toBe('sort');
    expect(emittedEvent.order.column).toBe('name');
  });

  it('should emit row select event', async () => {
    const { fixture } = await render(IonSmartTableComponent, {
      componentInputs: {
        config,
      },
    });
    const component = fixture.componentInstance;
    let emittedEvent: SafeAny;
    component.events.subscribe((event) => (emittedEvent = event));

    const rowCheck = screen.getByTestId('row-0-check');
    fireEvent.click(rowCheck);

    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent.event).toBe('row_select');
  });

  it('should emit check all event', async () => {
    const { fixture } = await render(IonSmartTableComponent, {
      componentInputs: {
        config,
      },
    });
    const component = fixture.componentInstance;
    let emittedEvent: SafeAny;
    component.events.subscribe((event) => (emittedEvent = event));

    const checkAll = screen.getByTestId('table-check-all');
    fireEvent.click(checkAll);

    expect(emittedEvent).toBeTruthy();
    expect(emittedEvent.event).toBe('row_select');
  });
});
