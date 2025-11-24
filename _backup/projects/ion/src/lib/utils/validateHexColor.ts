export const validateHexColor = (color: string): boolean => {
  return /^#(?:[0-9a-fA-F]{3,4}){1,2}$/.test(color);
};
