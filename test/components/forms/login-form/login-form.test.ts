import LoginForm from '../../../../src/components/forms/login-form/login-form';
import { APIUserActions } from '../../../../src/api/api-user-actions';
import { EmailPasswordCheck } from '../../../../src/utils/email_password_check';
import InputBase from '../../../../src/components/forms/input-base/input-base';
import { emailOptions } from '../../../../src/components/forms/login-form/input-options';
import InputPassword from '../../../../src/components/forms/input-password/input-password';

// eslint-disable-next-line
describe('LoginForm', () => {
  const api: APIUserActions = new APIUserActions();
  const emailValidator: EmailPasswordCheck = new EmailPasswordCheck();
  const loginForm: LoginForm = new LoginForm(api, emailValidator);
  const registerUserSpy = jest.spyOn(api, 'loginUser');

  // Mock the methods and properties of fieldset instances
  const mockIsValidData = jest.fn().mockReturnValue(true);
  const mockIsNotValidData = jest.fn().mockReturnValue(false);
  const mockGetData = jest.fn().mockReturnValue('valid data');

  const mockInputEmail = new InputBase(emailValidator.emailCheck, emailOptions);
  const mockInputPassword = new InputPassword(emailValidator, emailOptions);

  mockInputEmail.getValue = mockGetData;
  mockInputPassword.getValue = mockGetData;

  // eslint-disable-next-line
  loginForm['isValidData'] = mockIsValidData;
  // eslint-disable-next-line
  loginForm['inputMail'] = mockInputEmail;
  // eslint-disable-next-line
  loginForm['inputPassword'] = mockInputPassword;

  it('should create an instance of LoginForm', () => {
    expect(loginForm).toBeInstanceOf(LoginForm);
  });

  it('should not submit ivalid data', () => {
    // eslint-disable-next-line
    loginForm['isValidData'] = mockIsNotValidData;

    const submitButton = loginForm.getElement().querySelector('button');
    submitButton?.click();

    expect(registerUserSpy).not.toHaveBeenCalled();
  });

  it('should submit valid data', () => {
    // eslint-disable-next-line
    loginForm['isValidData'] = mockIsValidData;

    const submitButton = loginForm.getElement().querySelector('button');
    submitButton?.click();

    expect(registerUserSpy).toHaveBeenCalled();
  });
});
