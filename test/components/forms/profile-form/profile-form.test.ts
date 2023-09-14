import ProfileForm from '../../../../src/components/forms/profile-form/profile-form';
import { APIUserActions } from '../../../../src/api/api-user-actions';
import { EmailPasswordCheck } from '../../../../src/utils/email_password_check';
import { AddressCheck } from '../../../../src/utils/address_check';
import FieldsetPersonal from '../../../../src/components/forms/fieldset/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../../../../src/components/forms/fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../../../../src/components/forms/fieldset/fieldset-billing-address/fieldset-billing-address';

// eslint-disable-next-line
describe('ProfileForm', () => {
  const apiMockInstance = new APIUserActions() as jest.Mocked<APIUserActions>;
  const emailValidator: EmailPasswordCheck = new EmailPasswordCheck();
  const addressValidator: AddressCheck = new AddressCheck();
  const profileForm = new ProfileForm(apiMockInstance, emailValidator, addressValidator);

  // Mock the methods and properties of fieldset instances
  const mockIsValidData = jest.fn().mockReturnValue(true);
  const mockIsNotValidData = jest.fn().mockReturnValue(false);
  const mockGetData = jest.fn().mockReturnValue(['wtgger', 'rege']);

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

  it('should create an instance of RegistrationForm', () => {
    expect(profileForm).toBeInstanceOf(ProfileForm);
  });
});
