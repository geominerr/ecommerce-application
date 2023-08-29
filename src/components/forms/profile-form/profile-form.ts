import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset-profile/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset-profile/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset-profile/fieldset-billing-address/fieldset-billing-address';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles } from './enum';
import './profile-form.scss';
//

class ProfileForm extends BaseComponent {
  private form: HTMLFormElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShipping: FieldsetShip;

  private fieldSetBilling: FieldsetBill;

  private api: APIUserActions;

  private router: Router | null = null;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor(
    api: APIUserActions,
    validatorEmail: EmailPasswordCheck,
    validatorAddress: AddressCheck
  ) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);

    this.fieldSetPersonal = new FieldsetPersonal(validatorEmail, validatorAddress);
    this.fieldSetShipping = new FieldsetShip(validatorAddress);
    this.fieldSetBilling = new FieldsetBill(validatorAddress);
    this.api = api;

    this.createComponent();
    this.getUserData();
  }

  public async getUserData(): Promise<void> {
    try {
      const profileLink = document.querySelector(`a[href="/profile"]`) as HTMLAnchorElement;
      if (profileLink) {
        profileLink.addEventListener('click', async (event) => {
          event.preventDefault();
          await this.fetchUserData();
        });
      }
      await this.fetchUserData();
      [
        this.fieldSetPersonal.inputFirstName,
        this.fieldSetPersonal.inputLastName,
        this.fieldSetPersonal.inputMail,
        this.fieldSetPersonal.inputDateBirth,
        this.fieldSetShipping.select,
        this.fieldSetShipping.inputStreet,
        this.fieldSetShipping.inputStreetNumber,
        this.fieldSetShipping.inputPostal,
        this.fieldSetShipping.inputCity,
        this.fieldSetBilling.select,
        this.fieldSetBilling.inputStreet,
        this.fieldSetBilling.inputStreetNumber,
        this.fieldSetBilling.inputPostal,
        this.fieldSetBilling.inputCity,
      ].forEach((input) => input.inputDisable());
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  private async fetchUserData(): Promise<void> {
    if (localStorage.getItem(this.keyAccessToken)) {
      const api = new APIUserActions();
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        addresses,
        shippingAddressIds,
        billingAddressIds,
      } = await api.getPersonalInfo();
      this.fieldSetPersonal.setInputValues(firstName, lastName, email, dateOfBirth);
      if (shippingAddressIds.length > 0 && billingAddressIds.length > 0) {
        const shippingAddressId = shippingAddressIds[0];
        const billingAddressId = billingAddressIds[0];

        const shippingAddress = addresses.find((address) => address.id === shippingAddressId);
        const billingAddress = addresses.find((address) => address.id === billingAddressId);

        if (shippingAddress && billingAddress) {
          const { streetName, streetNumber, postalCode, city, country } = shippingAddress;
          this.fieldSetShipping.setInputValues(streetName, streetNumber, postalCode, city, country);

          if (shippingAddressId === billingAddressId) {
            this.fieldSetBilling.setInputValues(
              streetName,
              streetNumber,
              postalCode,
              city,
              country
            );
          } else {
            const {
              streetName: billingStreetName,
              streetNumber: billingStreetNumber,
              postalCode: billingPostalCode,
              city: billingCity,
              country: billingCountry,
            } = billingAddress;
            this.fieldSetBilling.setInputValues(
              billingStreetName,
              billingStreetNumber,
              billingPostalCode,
              billingCity,
              billingCountry
            );
          }
        }
      }
    }
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  private createComponent(): void {
    const { form, fieldSetPersonal, fieldSetShipping, fieldSetBilling } = this;

    const fieldsetPersonalElement: HTMLElement = fieldSetPersonal.getElement();
    const fieldSetShippingElement: HTMLElement = fieldSetShipping.getElement();
    const fieldSetBillingElement: HTMLElement = fieldSetBilling.getElement();

    [fieldsetPersonalElement, fieldSetShippingElement, fieldSetBillingElement].forEach(
      (el: HTMLElement): void => form.append(el)
    );
  }
}

export default ProfileForm;
