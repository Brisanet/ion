import {
  access,
  add,
  calendar,
  check,
  checkSolid,
  clockSolid,
  close,
  closeSolid,
  exclamationSolid,
  expand,
  filter,
  infoSolid,
  left2,
  option,
  pencil,
  plusSolid,
  refresh,
  right2,
  search,
  semiDown,
  semiUp,
  starSolid,
  technical,
  trash,
  union,
  wait,
} from './iconsText';

// To add an icon, use kebab-case on key name and insert only SVG paths on value
export const iconsPaths: Record<string, string> = {
  access,
  add,
  calendar,
  check,
  'check-solid': checkSolid,
  'clock-solid': clockSolid,
  close,
  'close-solid': closeSolid,
  'exclamation-solid': exclamationSolid,
  expand,
  filter,
  'info-solid': infoSolid,
  left2,
  pencil,
  option,
  'plus-solid': plusSolid,
  refresh,
  right2,
  search,
  'semi-down': semiDown,
  'semi-up': semiUp,
  'star-solid': starSolid,
  technical,
  trash,
  union,
  wait,
};
