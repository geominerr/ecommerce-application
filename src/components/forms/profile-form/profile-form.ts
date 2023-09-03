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

class ProfileForm extends BaseComponent {
  private form: HTMLFormElement;

  private personalInfo: HTMLDivElement;

  private shippingAddresses: HTMLDivElement;

  private billingAddresses: HTMLDivElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShippingList: FieldsetShip[];

  private fieldSetBillingList: FieldsetBill[];

  private api: APIUserActions;

  private router: Router | null = null;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor(
    api: APIUserActions,
    validatorEmail: EmailPasswordCheck,
    private validatorAddress: AddressCheck
  ) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.personalInfo = this.createElement(TagNames.DIV, Styles.INFO);
    this.shippingAddresses = this.createElement(TagNames.DIV, Styles.SHIPPING);
    this.billingAddresses = this.createElement(TagNames.DIV, Styles.BILLING);
    this.fieldSetPersonal = new FieldsetPersonal(validatorEmail, validatorAddress);
    this.fieldSetShippingList = [];
    this.fieldSetBillingList = [];
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
        defaultShippingAddressId,
        defaultBillingAddressId,
        version: requestVersion,
      } = await api.getPersonalInfo();

      this.clearShippingAddresses();
      this.clearBillingAddresses();

      this.fieldSetPersonal.setInputValues(firstName, lastName, email, dateOfBirth);
      shippingAddressIds.forEach((shippingAddressId) => {
        const shippingAddress = addresses.find((address) => address.id === shippingAddressId);
        if (shippingAddress) {
          const { streetName, streetNumber, postalCode, city, country } = shippingAddress;
          const fieldSetShipping = new FieldsetShip(this.validatorAddress);
          fieldSetShipping.setInputValues(streetName, streetNumber, postalCode, city, country);
          if (shippingAddressId === defaultShippingAddressId) {
            fieldSetShipping.checkboxShipDef.setChecked(true);
          }
          this.fieldSetShippingList.push(fieldSetShipping);
          this.shippingAddresses.append(fieldSetShipping.getElement());
        }
      });

      billingAddressIds.forEach((billingAddressId) => {
        const billingAddress = addresses.find((address) => address.id === billingAddressId);
        if (billingAddress) {
          const { streetName, streetNumber, postalCode, city, country } = billingAddress;
          const fieldSetBilling = new FieldsetBill(this.validatorAddress);
          fieldSetBilling.setInputValues(streetName, streetNumber, postalCode, city, country);
          if (billingAddressId === defaultBillingAddressId) {
            fieldSetBilling.checkboxBillDef.setChecked(true);
          }
          this.fieldSetBillingList.push(fieldSetBilling);
          this.billingAddresses.append(fieldSetBilling.getElement());
        }
      });
      this.disableAllInputs();
      localStorage.setItem('requestVersion', requestVersion.toString());
    }
  }

  private clearShippingAddresses(): void {
    this.fieldSetShippingList.forEach((fieldSetShipping) => {
      fieldSetShipping.getElement().remove();
    });
    this.fieldSetShippingList = [];
  }

  private clearBillingAddresses(): void {
    this.fieldSetBillingList.forEach((fieldSetBilling) => {
      fieldSetBilling.getElement().remove();
    });
    this.fieldSetBillingList = [];
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  private createComponent(): void {
    const { form, personalInfo, shippingAddresses, billingAddresses } = this;

    const fieldsetPersonalElement: HTMLElement = this.fieldSetPersonal.getElement();

    form.append(personalInfo, shippingAddresses, billingAddresses);

    personalInfo.append(fieldsetPersonalElement);
    this.changeUserData();
    this.cancelUserData();
    this.updateUserData();
  }

  private changeUserData(): void {
    this.fieldSetPersonal.edit.addEventListener('click', () => {
      this.enablePersonalInputs();
      this.showPersonalInfoButtons();
    });
  }

  private cancelUserData(): void {
    this.fieldSetPersonal.buttonCancel.addEventListener('click', () => {
      this.disableAllInputs();
      this.hidePersonalInfo();
    });
  }

  public takeInputValues(): {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  } {
    return this.fieldSetPersonal.getInputValues();
  }

  private updateUserData(): void {
    this.fieldSetPersonal.buttonSave.addEventListener('click', async () => {
      if (this.fieldSetPersonal.isValidData()) {
        const api = new APIUserActions();
        const { email, firstName, lastName, dateOfBirth } = this.takeInputValues();
        await api.updatePersonalInfo(email, firstName, lastName, dateOfBirth);
        this.disableAllInputs();
        this.hidePersonalInfo();
      }
    });
  }

  private disableAllInputs(): void {
    [
      this.fieldSetPersonal.inputFirstName,
      this.fieldSetPersonal.inputLastName,
      this.fieldSetPersonal.inputMail,
      this.fieldSetPersonal.inputDateBirth,
    ].forEach((input) => input.inputDisable());

    this.fieldSetShippingList.forEach((fieldSetShipping) => {
      fieldSetShipping.inputDisable();
    });

    this.fieldSetBillingList.forEach((fieldSetBilling) => {
      fieldSetBilling.inputDisable();
    });
  }

  private enablePersonalInputs(): void {
    this.fieldSetPersonal.inputEnable();
  }

  private hidePersonalInfo(): void {
    // Call the hideFromScreen method of the FieldsetPersonal instance
    this.fieldSetPersonal.hideFromScreen();
  }

  private showPersonalInfoButtons(): void {
    // Call the showOnScreen method of the FieldsetPersonal instance
    this.fieldSetPersonal.showOnScreen();
  }
}

export default ProfileForm;
