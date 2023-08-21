import InputPassword from '../../../../src/components/forms/input-password/input-password';
import { passwordOptions } from '../../../../src/components/forms/login-form/input-options';
import { EmailPasswordCheck } from '../../../../src/utils/email_password_check';
import { Styles } from '../../../../src/components/forms/input-password/enum';

describe('InputPassword', () => {
  const validator: EmailPasswordCheck = new EmailPasswordCheck();
  const inputPassword: InputPassword = new InputPassword(validator, passwordOptions);
  const inputPasswordElement = inputPassword
    .getElement()
    .querySelector(`.${Styles.INPUT}`) as HTMLInputElement;

  it('should create an instance of inputPassword', () => {
    expect(inputPassword).toBeInstanceOf(InputPassword);
  });

  it('isValid should return true when input value is not empty and has no error class', () => {
    inputPasswordElement.value = 'email@gmail.com';
    const isValidData = validator.passwordCheck(inputPasswordElement.value);

    if (!isValidData) {
      inputPassword.showHintRequiredFieldIsEmpty();
    }

    const result = inputPassword.isValid();

    if (!isValidData) {
      expect(result).toBe(false);
      expect(inputPasswordElement.classList.contains(Styles.INPUT_ERROR)).toBe(true);
    } else {
      expect(result).toBe(true);
      expect(inputPasswordElement.classList.contains(Styles.INPUT_ERROR)).toBe(false);
    }
  });

  it('isValid should return false when input value is  empty or has  error class', () => {
    inputPassword.showHintNotFoundUser();
    const result = inputPassword.isValid();

    expect(result).toBe(false);
    expect(inputPasswordElement.classList.contains(Styles.INPUT_ERROR)).toBe(true);
  });
});
