export function createElement(tagName: string, style: string): HTMLElement {
  const element: HTMLElement = document.createElement(tagName);
  element.classList.add(style);

  return element;
}
