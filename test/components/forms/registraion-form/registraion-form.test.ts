import RegistrationForm from '../../../../src/components/forms/registration-form/registration-form';
import { APIUserActions } from '../../../../src/api/api-user-actions';
import { EmailPasswordCheck } from '../../../../src/utils/email_password_check';
import { AddressCheck } from '../../../../src/utils/address_check';
import FieldsetPersonal from '../../../../src/components/forms/fieldset/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../../../../src/components/forms/fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../../../../src/components/forms/fieldset/fieldset-billing-address/fieldset-billing-address';

// eslint-disable-next-line
describe('RegistrationForm', () => {
  const apiMockInstance = new APIUserActions() as jest.Mocked<APIUserActions>;
  const emailValidator: EmailPasswordCheck = new EmailPasswordCheck();
  const addressValidator: AddressCheck = new AddressCheck();
  const registrationForm = new RegistrationForm(apiMockInstance, emailValidator, addressValidator);
  const registerUserSpy = jest.spyOn(apiMockInstance, 'registerUser').mockResolvedValue();

  // Mock the methods and properties of fieldset instances
  const mockIsValidData = jest.fn().mockReturnValue(true);
  const mockIsNotValidData = jest.fn().mockReturnValue(false);
  const mockGetData = jest.fn().mockReturnValue(['sdf', 'sdfdsf']);

  const mockFieldsetPersonal = new FieldsetPersonal(emailValidator, addressValidator);
  const mockFieldsetPersonalNotValid = new FieldsetPersonal(emailValidator, addressValidator);
  const mockFieldsetShipping = new FieldsetShip(addressValidator);
  const mockFieldsetBilling = new FieldsetBill(addressValidator);

  mockFieldsetPersonalNotValid.isValidData = mockIsNotValidData;
  mockFieldsetPersonal.isValidData = mockIsValidData;
  mockFieldsetShipping.isValidData = mockIsValidData;
  mockFieldsetBilling.isValidData = mockIsValidData;
  mockFieldsetPersonal.getData = mockGetData;
  mockFieldsetShipping.getData = mockGetData;
  mockFieldsetBilling.getData = mockGetData;

  // eslint-disable-next-line
  registrationForm['fieldSetPersonal'] = mockFieldsetPersonalNotValid;
  // eslint-disable-next-line
  registrationForm['fieldSetShipping'] = mockFieldsetShipping;
  // eslint-disable-next-line
  registrationForm['fieldSetBilling'] = mockFieldsetBilling;

  it('should create an instance of RegistrationForm', () => {
    expect(registrationForm).toBeInstanceOf(RegistrationForm);
  });

  it('should not submit ivalid data', () => {
    const submitButton = registrationForm.getElement().querySelector('button');
    submitButton?.click();

    expect(registerUserSpy).not.toHaveBeenCalled();
  });

  it('should submit valid data', () => {
    // eslint-disable-next-line
    registrationForm['fieldSetPersonal'] = mockFieldsetPersonal;

    const submitButton = registrationForm.getElement().querySelector('button');
    submitButton?.click();

    expect(registerUserSpy).toHaveBeenCalled();
  });
});
