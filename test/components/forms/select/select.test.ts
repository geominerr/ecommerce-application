import SelectComponent from '../../../../src/components/forms/select/select';

describe('SelectComponent', () => {
  const selectComponent = new SelectComponent('billing');

  const selectElement = selectComponent
    .getElement()
    .querySelector('.select-custom') as HTMLSelectElement;

  it('should create an instance of SelectComponent', () => {
    expect(selectComponent).toBeInstanceOf(SelectComponent);
  });

  it('getCodeCountry should return an empty string if nothing is selected', () => {
    const res = selectComponent.getCodeCountry();

    expect(res).toBe('');
  });

  it('getCodeCountry should return string is selected option', () => {
    selectElement.selectedIndex = 5;
    const res = selectComponent.getCodeCountry();

    expect(typeof res).toBe('string');
  });
});
