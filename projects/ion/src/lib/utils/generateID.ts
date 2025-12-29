const MAX_LENGTH = 9999;

export const ID_SELECTOR = '#';

export const COOLDOWN_TIME = 400;

export const generateIDs = (prefix: string, testid: string): string => {
  let id = 1;
  const allElements = document.querySelectorAll(
    '*[data-testid="' + testid + '"]',
  );
  const arrayElements = Array.from(allElements);
  arrayElements.map((element) => {
    const startID = prefix.length;
    const elementID = parseInt(element.id.substring(startID, MAX_LENGTH));
    id = elementID >= id ? elementID + 1 : id;
  });
  return prefix + id;
};
