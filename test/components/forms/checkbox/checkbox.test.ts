import CheckboxComponent from '../../../../src/components/forms/checkbox/checkbox';
import { TagNames, Styles, Attributes } from '../../../../src/components/forms/checkbox/enum';

describe('CheckboxComponent', () => {
  let checkboxComponent: CheckboxComponent;

  beforeEach(() => {
    checkboxComponent = new CheckboxComponent('Random text', 'Id777');
  });

  it('should create an instance of CheckboxComponent', () => {
    expect(checkboxComponent).toBeInstanceOf(CheckboxComponent);
  });

  it('getElement method should return a container element', () => {
    const element = checkboxComponent.getElement();

    expect(element.tagName).toBe(`${TagNames.DIV}`.toUpperCase());
    expect(element.classList.contains(Styles.CONTAINER)).toBe(true);
  });

  it('getCheckboxElement method should return an input element', () => {
    const checkboxElement = checkboxComponent.getCheckboxElement();

    expect(checkboxElement.tagName).toBe(`${TagNames.INPUT}`.toUpperCase());
    expect(checkboxElement.getAttribute(Attributes.TYPE)).toBe(Attributes.TYPE_VALUE_CHECKBOX);
  });
});
