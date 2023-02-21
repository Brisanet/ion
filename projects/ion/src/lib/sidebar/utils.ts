import { Item } from '../core/types';

function selectItem(items: Item[], index: number): void {
  items[index].selected = true;
}

function callItemAction(items: Item[], index: number): void {
  if (items[index].action) {
    items[index].action();
  }
}

export function unselectAllItems(items: Item[]): void {
  items.forEach((item) => (item.selected = false));
}

export function selectItemByIndex(items: Item[], itemIndex: number): Item[] {
  unselectAllItems(items);
  selectItem(items, itemIndex);
  callItemAction(items, itemIndex);
  return items;
}
