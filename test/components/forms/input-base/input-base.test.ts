import InputBase from '../../../../src/components/forms/input-base/input-base';
import { emailOptions } from '../../../../src/components/forms/login-form/input-options';
import { EmailPasswordCheck } from '../../../../src/utils/email_password_check';

describe('InputBase', () => {
  const inputBase: InputBase = new InputBase(new EmailPasswordCheck().emailCheck, emailOptions);
  const inputBaseElement = inputBase.getElement().querySelector('.input') as HTMLInputElement;

  it('should create an instance of inputBase', () => {
    expect(inputBase).toBeInstanceOf(InputBase);
  });

  it('isValid should return true when input value is not empty and has no error class', () => {
    inputBaseElement.value = 'email@gmail.com';
    const result = inputBase.isValid();

    expect(result).toBe(true);
    expect(inputBaseElement.classList.contains('input--error')).toBe(false);
  });

  it('isValid should return false when input value is empty or has  error class', () => {
    inputBase.showHintNotFoundUser();
    const result = inputBase.isValid();

    expect(result).toBe(false);
    expect(inputBaseElement.classList.contains('input--error')).toBe(true);
  });
});
