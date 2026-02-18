import { TestBed } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { IonTransferListComponent } from './transfer-list.component';
import { DropdownItem } from '../core/types/dropdown';

const leftOptions: DropdownItem[] = [
  { label: 'Item 1', key: 'item1' },
  { label: 'Item 2', key: 'item2' },
];

const rightOptions: DropdownItem[] = [
  { label: 'Item 3', key: 'item3' },
];

describe('IonTransferListComponent', () => {
  it('should render initial items in both lists', async () => {
    await render(IonTransferListComponent, {
      componentInputs: {
        leftOptions,
        rightOptions,
      },
    });

    expect(screen.getByTestId('left-item-item1')).toBeTruthy();
    expect(screen.getByTestId('left-item-item2')).toBeTruthy();
    expect(screen.getByTestId('right-item-item3')).toBeTruthy();
  });

  it('should move an item from left to right', async () => {
    const { fixture } = await render(IonTransferListComponent, {
      componentInputs: {
        leftOptions: [...leftOptions],
        rightOptions: [...rightOptions],
      },
    });

    // Select Item 1 on the left
    const item1 = screen.getByTestId('left-item-item1');
    fireEvent.click(item1);
    fixture.detectChanges();

    // Click move to right button
    const moveBtn = screen.getByTestId('btn-move-right-btn');
    fireEvent.click(moveBtn);
    fixture.detectChanges();

    // Verify it moved to the right list
    expect(screen.queryByTestId('left-item-item1')).toBeFalsy();
    expect(screen.getByTestId('right-item-item1')).toBeTruthy();
  });

  it('should move all items from left to right', async () => {
    const { fixture } = await render(IonTransferListComponent, {
      componentInputs: {
        leftOptions: [...leftOptions],
        rightOptions: [...rightOptions],
      },
    });

    const moveAllBtn = screen.getByTestId('btn-move-all-right-btn');
    fireEvent.click(moveAllBtn);
    fixture.detectChanges();

    expect(screen.queryByTestId('left-item-item1')).toBeFalsy();
    expect(screen.queryByTestId('left-item-item2')).toBeFalsy();
    expect(screen.getByTestId('right-item-item1')).toBeTruthy();
    expect(screen.getByTestId('right-item-item2')).toBeTruthy();
    expect(screen.getByTestId('right-item-item3')).toBeTruthy();
  });

  it('should filter items on search', async () => {
    const { fixture } = await render(IonTransferListComponent, {
      componentInputs: {
        leftOptions,
        searchable: true,
      },
    });

    // Wait for search input to be in the DOM
    const searchInputs = screen.getAllByPlaceholderText('Buscar');
    const leftSearch = searchInputs[0];
    
    fireEvent.input(leftSearch, { target: { value: 'Item 2' } });
    fixture.detectChanges();

    expect(screen.queryByTestId('left-item-item1')).toBeFalsy();
    expect(screen.getByTestId('left-item-item2')).toBeTruthy();
  });

  it('should be disabled when disabled input is true', async () => {
    await render(IonTransferListComponent, {
      componentInputs: {
        leftOptions,
        disabled: true,
      },
    });

    const container = screen.getByTestId('ion-transfer-list');
    expect(container.classList.contains('ion-transfer-list--disabled')).toBeTruthy();
  });
});
