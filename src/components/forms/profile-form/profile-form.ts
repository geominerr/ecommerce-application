import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset-profile/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset-profile/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset-profile/fieldset-billing-address/fieldset-billing-address';
import FieldsetPassword from '../fieldset-profile/fieldset-password/fieldset-change-password';
import FieldsetNewAddress from '../fieldset-profile/fieldset-new-address/fieldset-new-address';
import StateManager from '../../../state-manager/state-manager';
import { popup } from '../../popup/popup';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles } from './enum';
import './profile-form.scss';

class ProfileForm extends BaseComponent {
  private form: HTMLFormElement;

  private personalInfo: HTMLDivElement;

  public addAddress: HTMLButtonElement;

  private passwordsContainer: HTMLDivElement;

  public changePassword: HTMLButtonElement;

  private shippingAddresses: HTMLDivElement;

  private billingAddresses: HTMLDivElement;

  private fieldSetNewAddress: FieldsetNewAddress;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShippingList: FieldsetShip[];

  private fieldSetBillingList: FieldsetBill[];

  private fieldSetPassword: FieldsetPassword;

  private stateManager: StateManager | null = null;

  private pathToLogin: string = '/authorization';

  private popup = popup;

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
    this.passwordsContainer = this.createElement(TagNames.DIV, Styles.PASSWORD);
    this.addAddress = this.createElement(TagNames.BUTTON, Styles.BUTTON_ADD);
    this.addAddress.innerHTML = 'Add Address';
    this.changePassword = this.createElement(TagNames.BUTTON, Styles.BUTTON_CHANGE);
    this.changePassword.innerHTML = 'Change Password';
    this.shippingAddresses = this.createElement(TagNames.DIV, Styles.SHIPPING);
    this.billingAddresses = this.createElement(TagNames.DIV, Styles.BILLING);
    this.fieldSetNewAddress = new FieldsetNewAddress(validatorAddress);
    this.fieldSetPersonal = new FieldsetPersonal(validatorEmail, validatorAddress);
    this.fieldSetPassword = new FieldsetPassword(validatorEmail);
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
          const fieldSetShipping = new FieldsetShip(this.validatorAddress, shippingAddressId);
          fieldSetShipping.setInputValues(streetName, streetNumber, postalCode, city, country);
          if (shippingAddressId === defaultShippingAddressId) {
            fieldSetShipping.checkboxShipDef.setChecked(true);
          }
          fieldSetShipping.remove.addEventListener('click', () => {
            this.removeShippingAddress(shippingAddressId);
          });
          this.fieldSetShippingList.push(fieldSetShipping);
          this.shippingAddresses.append(fieldSetShipping.getElement());
        }
      });

      billingAddressIds.forEach((billingAddressId) => {
        const billingAddress = addresses.find((address) => address.id === billingAddressId);
        if (billingAddress) {
          const { streetName, streetNumber, postalCode, city, country } = billingAddress;
          const fieldSetBilling = new FieldsetBill(this.validatorAddress, billingAddressId);
          fieldSetBilling.setInputValues(streetName, streetNumber, postalCode, city, country);
          if (billingAddressId === defaultBillingAddressId) {
            fieldSetBilling.checkboxBillDef.setChecked(true);
          }
          fieldSetBilling.remove.addEventListener('click', () => {
            this.removeBillingAddress(billingAddressId);
          });
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

  public setStateManager(state: StateManager): void {
    this.stateManager = state;
  }

  // eslint-disable-next-line max-lines-per-function
  private createComponent(): void {
    const {
      form,
      personalInfo,
      addAddress,
      shippingAddresses,
      billingAddresses,
      changePassword,
      passwordsContainer,
    } = this;

    const fieldsetAddAddressElement: HTMLElement = this.fieldSetNewAddress.getElement();
    const fieldsetPersonalElement: HTMLElement = this.fieldSetPersonal.getElement();
    const fieldsetPasswordElement: HTMLElement = this.fieldSetPassword.getElement();

    form.append(
      personalInfo,
      addAddress,
      fieldsetAddAddressElement,
      shippingAddresses,
      billingAddresses,
      changePassword,
      passwordsContainer
    );

    personalInfo.append(fieldsetPersonalElement);
    passwordsContainer.append(fieldsetPasswordElement);
    this.addNewAddress();
    this.cancelNewAddress();
    this.changeUserData();
    this.changePasswordData();
    this.cancelUserData();
    this.cancelPasswords();
    this.pushNewAddress();
    this.updateUserData();
    this.updateShippingData();
    this.updateDeafaultShippingAddress();
    this.updateBillingData();
    this.updateDeafaultBillingAddress();
    this.setNewPassword();
  }

  private addNewAddress(): void {
    this.addAddress.addEventListener('click', () => {
      this.fieldSetNewAddress.fieldsetElement.classList.add(Styles.FIELDSET_SHOW);
    });
  }

  private cancelNewAddress(): void {
    this.fieldSetNewAddress.buttonCancel.addEventListener('click', async () => {
      this.fieldSetNewAddress.fieldsetElement.classList.remove(Styles.FIELDSET_SHOW);
    });
  }

  private changeUserData(): void {
    this.fieldSetPersonal.edit.addEventListener('click', () => {
      this.enablePersonalInputs();
      this.showPersonalInfoButtons();
    });
  }

  private changePasswordData(): void {
    this.changePassword.addEventListener('click', () => {
      this.fieldSetPassword.showPassword();
    });
  }

  private cancelUserData(): void {
    this.fieldSetPersonal.buttonCancel.addEventListener('click', () => {
      this.disableAllInputs();
      this.hidePersonalInfo();
    });
  }

  private cancelPasswords(): void {
    this.fieldSetPassword.buttonCancel.addEventListener('click', () => {
      this.fieldSetPassword.hidePassword();
      this.fieldSetPassword.clearPassword();
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
        this.fieldSetPersonal.highlightInputs(1000);
        this.disableAllInputs();
        this.hidePersonalInfo();
        await this.fetchUserData();
      }
    });
  }

  private pushNewAddress(): void {
    this.fieldSetNewAddress.buttonSave.addEventListener('click', async () => {
      if (this.fieldSetNewAddress.isValidData()) {
        const api = new APIUserActions();
        const { streetName, streetNumber, postalCode, city, country, type } =
          this.fieldSetNewAddress.getInputValues();
        if (type === 'SHIP') {
          const addressId = await api.addNewAddress(
            streetName,
            streetNumber,
            postalCode,
            city,
            country
          );
          await api.addShippingAddressByID(addressId);
        } else if (type === 'BILL') {
          const addressId = await api.addNewAddress(
            streetName,
            streetNumber,
            postalCode,
            city,
            country
          );
          await api.addBillingAddressByID(addressId);
        }
        await this.fieldSetNewAddress.highlightInputs(1000);
        this.fieldSetNewAddress.clearInputs();
        await this.fetchUserData();
        this.fieldSetNewAddress.fieldsetElement.classList.remove(Styles.FIELDSET_SHOW);
      }
    });
  }

  private updateShippingData(): void {
    this.form.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('save-button')) {
        const fieldSetShipping = this.fieldSetShippingList.find((fieldSet) =>
          fieldSet.getElement().contains(target)
        );
        if (fieldSetShipping && fieldSetShipping.isValidData()) {
          const api = new APIUserActions();
          const { streetName, streetNumber, postalCode, city, country } =
            fieldSetShipping.getInputValues();
          await api.updateAddressesInfo(
            fieldSetShipping.addressId,
            streetName,
            streetNumber,
            postalCode,
            city,
            country
          );
          await fieldSetShipping.highlightInputs(1000);
          await this.fetchUserData();
        }
      }
    });
  }

  private updateDeafaultShippingAddress(): void {
    this.form.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('checkbox-standart')) {
        const fieldSetShipping = this.fieldSetShippingList.find((fieldSet) =>
          fieldSet.getElement().contains(target)
        );
        if (fieldSetShipping && fieldSetShipping.isValidData()) {
          const api = new APIUserActions();
          const isChecked = fieldSetShipping.checkboxShipDef.isChecked();
          if (isChecked === false) {
            await api.removeDefaultShippingAddress();
          } else {
            await api.updateDefaultShippingAddress(fieldSetShipping.addressId);
          }
          await this.fetchUserData();
        }
      }
    });
  }

  private updateBillingData(): void {
    this.form.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('save-button')) {
        const fieldSetBilling = this.fieldSetBillingList.find((fieldSet) =>
          fieldSet.getElement().contains(target)
        );
        if (fieldSetBilling && fieldSetBilling.isValidData()) {
          const api = new APIUserActions();
          const { streetName, streetNumber, postalCode, city, country } =
            fieldSetBilling.getInputValues();
          await api.updateAddressesInfo(
            fieldSetBilling.addressId,
            streetName,
            streetNumber,
            postalCode,
            city,
            country
          );
          await fieldSetBilling.highlightInputs(1000);
          await this.fetchUserData();
        }
      }
    });
  }

  private updateDeafaultBillingAddress(): void {
    this.form.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('checkbox-standart')) {
        const fieldSetBilling = this.fieldSetBillingList.find((fieldSet) =>
          fieldSet.getElement().contains(target)
        );
        if (fieldSetBilling && fieldSetBilling.isValidData()) {
          const api = new APIUserActions();
          const isChecked = fieldSetBilling.checkboxBillDef.isChecked();
          if (isChecked === false) {
            await api.removeDefaultBillingAddress();
          } else {
            await api.updateDefaultBillingAddress(fieldSetBilling.addressId);
          }
          await this.fetchUserData();
        }
      }
    });
  }

  public takePasswordValues(): {
    currentPassword: string;
    newPassword: string;
  } {
    return this.fieldSetPassword.getInputValues();
  }

  private setNewPassword(): void {
    this.fieldSetPassword.buttonSave.addEventListener('click', async () => {
      if (this.fieldSetPassword.isValidData()) {
        const api = new APIUserActions();
        const { currentPassword, newPassword } = this.takePasswordValues();
        await api
          .changeUserPassword(currentPassword, newPassword)
          .then(() => {
            this.popup.showChangePasswordMessage();
            this.fieldSetPassword.clearPassword();
            this.fieldSetPassword.hidePassword();
            this.api.logoutUser();
            this.redirectToLogin();
          })
          .catch((err) => {
            if (err.message.includes('400')) {
              this.popup.showOldPassNotConfirmErrorMessage();
            }
          });
      }
    });
  }

  private async removeShippingAddress(shippingAddressId: string): Promise<void> {
    const api = new APIUserActions();
    await api.removeShippingAddress(shippingAddressId);
    await this.fetchUserData();
  }

  private async removeBillingAddress(billingAddressId: string): Promise<void> {
    const api = new APIUserActions();
    await api.removeBillingAddress(billingAddressId);
    await this.fetchUserData();
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

  private redirectToLogin(): void {
    if (this.router && this.stateManager) {
      this.stateManager.changeAuthorizationStatus();
      history.pushState(null, '', this.pathToLogin);
      this.router.router();
    }
  }

  private enablePersonalInputs(): void {
    this.fieldSetPersonal.inputEnable();
  }

  private hidePersonalInfo(): void {
    this.fieldSetPersonal.hideFromScreen();
  }

  private showPersonalInfoButtons(): void {
    this.fieldSetPersonal.showOnScreen();
  }
}

export default ProfileForm;
