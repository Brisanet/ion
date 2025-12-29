import { SidebarItem } from '../core/types/sidebar';
import { MOUSE_BUTTONS } from '../utils/mouse-buttons';

function selectItem(items: SidebarItem[], index: number): void {
  items[index].selected = true;
}

export function callItemAction(
  items: SidebarItem[],
  index: number,
  event: MouseEvent,
): void {
  if (items[index].action) {
    items[index].action(event);
  }
}

export function unselectAllItems(
  items: SidebarItem[],
  exceptItemIndex?: number,
): void {
  items.forEach((item, index) => {
    item.selected =
      exceptItemIndex !== undefined ? index === exceptItemIndex : false;
  });
}

export function selectItemByIndex(
  items: SidebarItem[],
  itemIndex: number,
  event: MouseEvent,
): SidebarItem[] {
  if (event && event.button === MOUSE_BUTTONS.MIDDLE) {
    callItemAction(items, itemIndex, event);
    return items;
  }

  unselectAllItems(items);
  selectItem(items, itemIndex);
  callItemAction(items, itemIndex, event);
  return items;
}
