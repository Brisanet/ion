const MAX_LENGTH = 9999;

export const generateIDs = (prefix: string, testeid: string): string => {
  let id = 1;
  const allElements = document.querySelectorAll(
    '*[data-testid="' + testeid + '"]'
  );
  const arrayElements = Array.from(allElements);
  arrayElements.map((element) => {
    const startID = prefix.length;
    const elementID = parseInt(element.id.substring(startID, MAX_LENGTH));
    if (elementID >= id) {
      id = elementID + 1;
    }
  });
  return prefix + id;
};
