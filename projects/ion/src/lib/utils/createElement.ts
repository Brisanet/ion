export type CreateElementProps = {
  type: string;
  text: string;
  attributes: Attribute[];
};

type Attribute = {
  key: string;
  value: string;
};

export const createElement = ({
  text,
  type,
  attributes,
}: CreateElementProps): HTMLElement => {
  const element = document.createElement(type);
  element.innerHTML = text;

  attributes.forEach(({ key, value }) => {
    element.setAttribute(key, value);
  });
  return element;
};
