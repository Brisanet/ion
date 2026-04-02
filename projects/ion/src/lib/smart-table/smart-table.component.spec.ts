import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  standalone: true,
  imports: [CommonModule, IonSmartTableComponent],
  template: `
    <ng-template #popoverBody><span>popover-body</span></ng-template>
    @if (viewReady) {
      <ion-smart-table [config]="smartConfig" />
    }
  `,
})
class HostSmartTablePopoverHooksComponent implements OnInit {
  @ViewChild('popoverBody', { static: true }) popoverBody!: TemplateRef<SafeAny>;

  ionOnClick = jest.fn();

  viewReady = false;

  smartConfig!: ConfigSmartTable<SafeAny>;

  ngOnInit(): void {
    this.smartConfig = {
      data: [{ id: 1, name: 'Item 1' }],
      columns: [
        { label: 'ID', key: 'id', sort: true },
        { label: 'Name', key: 'name', sort: true },
      ],
      pagination: { total: 1, itemsPerPage: 10, page: 1 },
      check: false,
      actions: [
        {
          label: 'More',
          icon: 'dots',
          popover: () => ({
            ionPopoverTitle: 'Title',
            ionPopoverBody: this.popoverBody,
            ionOnClick: (row: SafeAny) => this.ionOnClick(row),
          }),
        },
      ],
    };
    this.viewReady = true;
  }
}

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

  it('should call ionOnClick from action.popover with row', async () => {
    const { fixture } = await render(HostSmartTablePopoverHooksComponent);
    const host = fixture.componentInstance;
    fixture.detectChanges();

    const triggerHost = screen.getByTestId('row-0-More');
    const innerButton = triggerHost.querySelector('button');
    expect(innerButton).toBeTruthy();
    fireEvent.click(innerButton!);

    expect(host.ionOnClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, name: 'Item 1' }),
    );
  });
});
