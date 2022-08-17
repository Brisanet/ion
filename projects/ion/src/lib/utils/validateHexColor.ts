export const validateHexColor = (color: string) => {
  return /^#([0-f]{6})$/.test(color) ? true : false;
};
