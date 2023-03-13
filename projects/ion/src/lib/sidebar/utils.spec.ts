import { unselectAllItems } from './utils';
import { Item } from '../core/types';

const items: Item[] = [
  { selected: false, title: '', icon: '' },
  { selected: true, title: '', icon: '' },
  { selected: false, title: '', icon: '' },
];

describe('unselectAllItems', () => {
  it('should deselect all items if no index is provided', () => {
    unselectAllItems(items);
    expect(items.every((item) => !item.selected)).toBe(true);
  });

  it('should deselect all items except the one at the specified index', () => {
    const exceptItemIndex = 1;
    unselectAllItems(items, exceptItemIndex);
    expect(items[exceptItemIndex].selected).toBe(true);
    expect(items.filter((item) => item.selected).length).toBe(1);
  });

  it('should not change the selection if an invalid index is provided', () => {
    const invalidIndex = 10;
    unselectAllItems(items, invalidIndex);
    expect(items.every((item) => !item.selected)).toBe(true);
  });
});
