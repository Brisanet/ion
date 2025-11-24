export const ToHaveAttribute = (
  element: HTMLElement,
  attribute: string,
  value: string
): boolean => {
  return element.getAttribute(attribute) === value;
};
