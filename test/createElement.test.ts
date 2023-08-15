import { createElement } from '../src/router/createElement';

test('should create an HTMLElement with the given tagName', () => {
  const tagName = 'div';
  const style = 'test-style';
  const element = createElement(tagName, style);
  expect(element.tagName).toBe(tagName.toUpperCase());
});
