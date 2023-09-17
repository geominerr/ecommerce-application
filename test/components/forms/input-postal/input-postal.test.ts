import InputPostal from '../../../../src/components/forms/input-postal/input-postal';
import { AddressCheck } from '../../../../src/utils/address_check';
import { emailOptions } from '../../../../src/components/forms/login-form/input-options';

describe('inputPostal', () => {
  const inputPostal: InputPostal = new InputPostal(
    new AddressCheck().postalCodeCheck,
    emailOptions
  );
  const inputPostalElement = inputPostal.getElement().querySelector('.input') as HTMLInputElement;

  it('should create an instance of inputPostal', () => {
    expect(inputPostal).toBeInstanceOf(InputPostal);
  });

  it('isValid should return true when input value is not empty and has no error class', () => {
    inputPostalElement.value = 'email@gmail.com';
    const result = inputPostal.isValid();

    expect(result).toBe(true);
    expect(inputPostalElement.classList.contains('input--error')).toBe(false);
  });

  it('isValid should return false when input value is empty or has error class', () => {
    inputPostal.showHintNotFoundUser();
    const result = inputPostal.isValid();

    expect(result).toBe(false);
    expect(inputPostalElement.classList.contains('input--error')).toBe(true);
  });
});
