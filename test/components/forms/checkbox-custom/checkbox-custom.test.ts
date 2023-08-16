import CheckboxCustom from '../../../../src/components/forms/checkbox-custom/checkbox-custom';

describe('CheckboxCustom', () => {
  let checkboxComponent: CheckboxCustom;

  beforeEach(() => {
    checkboxComponent = new CheckboxCustom().createComponent();
  });

  it('should create an instance of CheckboxCustom', () => {
    expect(checkboxComponent).toBeInstanceOf(CheckboxCustom);
  });

  it('getElement method should return a label element', () => {
    const element = checkboxComponent.getElement();

    expect(element instanceof HTMLLabelElement).toBe(true);
  });

  it('getCheckboxElement method should return an input element with checkbox type', () => {
    const checkboxElement = checkboxComponent.getCheckboxElement();

    expect(checkboxElement instanceof HTMLInputElement).toBe(true);
    expect(checkboxElement.getAttribute('type')).toBe('checkbox');
  });
});
