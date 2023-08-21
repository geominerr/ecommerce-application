import BaseComponent from '../../../src/components/base/base-component/base-component';

describe('BaseComponent', () => {
  it('createElement method should create an element with given tag name and add the specified style', () => {
    const baseComponent = new BaseComponent();
    const tagName = 'div';
    const style = 'style';

    // eslint-disable-next-line @typescript-eslint/dot-notation
    const element = baseComponent['createElement'](tagName, style);

    expect(element.tagName).toBe(tagName.toUpperCase());
    expect(element.classList.contains(style)).toBe(true);
  });
});
