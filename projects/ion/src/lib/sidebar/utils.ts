import { Item } from '../core/types';

function selectItem(items: Item[], index: number): void {
  items[index].selected = true;
}

export function callItemAction(items: Item[], index: number): void {
  if (items[index].action) {
    items[index].action();
  }
}

export function unselectAllItems(
  items: Item[],
  exceptItemIndex?: number
): void {
  items.forEach((item, index) => {
    item.selected =
      exceptItemIndex !== undefined ? index === exceptItemIndex : false;
  });
}

export function selectItemByIndex(items: Item[], itemIndex: number): Item[] {
  unselectAllItems(items);
  selectItem(items, itemIndex);
  callItemAction(items, itemIndex);
  return items;
}
