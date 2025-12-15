import { Item } from '../core/types/sidebar';

function selectItem(items: Item[], index: number): void {
  items[index].selected = true;
}

export function callItemAction(
  items: Item[],
  index: number,
  event: MouseEvent
): void {
  if (items[index].action) {
    items[index].action(event);
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

export function selectItemByIndex(
  items: Item[],
  itemIndex: number,
  event: MouseEvent
): Item[] {
  unselectAllItems(items);
  selectItem(items, itemIndex);
  callItemAction(items, itemIndex, event);
  return items;
}
