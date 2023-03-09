import { Item } from '../core/types';

function selectItem(items: Item[], index: number): void {
  items[index].selected = true;
}

function callItemAction(items: Item[], index: number): void {
  if (items[index].action) {
    items[index].action();
  }
}

export function unselectAllItems(items: Item[], exceptItemIndex = -1): void {
  items.forEach((item) => (item.selected = false));

  if (exceptItemIndex >= 0) {
    items[exceptItemIndex].selected = true;
  }
}

export function selectItemByIndex(items: Item[], itemIndex: number): Item[] {
  unselectAllItems(items);
  selectItem(items, itemIndex);
  callItemAction(items, itemIndex);
  return items;
}
