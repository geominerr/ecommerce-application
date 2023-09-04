import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset/fieldset-billing-address/fieldset-billing-address';
import Button from '../button/button';
import Popup from '../../popup/popup';
import CheckboxComponent from '../checkbox/checkbox';
import StateManager from '../../../state-manager/state-manager';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { IAddress, IUserData } from '../../../types/general/general';
import { TagNames, Styles, Content, Events, Attributes, TypeButton } from './enum';
import './registration-form.scss';

class RegistrationForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShipping: FieldsetShip;

  private fieldSetBilling: FieldsetBill;

  private button: Button;

  private checkboxShipDef: CheckboxComponent;

  private checkboxShipping: CheckboxComponent;

  private checkboxBillDef: CheckboxComponent;

  private checkboxBilling: CheckboxComponent;

  private loginContainer: HTMLDivElement;

  private titleHint: HTMLHeadElement;

  private buttonLogin: Button;

  private popup: Popup;

  private api: APIUserActions;

  private router: Router | null = null;

  private stateManager: StateManager | null = null;

  private pathToMain: string = '/';

  private pathToAuthorization: string = '/authorization';

  constructor(
    api: APIUserActions,
    validatorEmail: EmailPasswordCheck,
    validatorAddress: AddressCheck
  ) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.fieldSetPersonal = new FieldsetPersonal(validatorEmail, validatorAddress);
    this.fieldSetShipping = new FieldsetShip(validatorAddress);
    this.fieldSetBilling = new FieldsetBill(validatorAddress);
    this.button = new Button(TypeButton.SIGN_UP);
    this.checkboxShipping = new CheckboxComponent(Content.LABEL_ONE, Attributes.ID_VALUE_SHIP);
    this.checkboxShipDef = new CheckboxComponent(Content.LABEL, Attributes.ID_VALUE_SHIP_DEF);
    this.checkboxBilling = new CheckboxComponent(Content.LABEL_ONE, Attributes.ID_VALUE_BILL);
    this.checkboxBillDef = new CheckboxComponent(Content.LABEL, Attributes.ID_VALUE_BILL_DEF);
    this.loginContainer = this.createElement(TagNames.DIV, Styles.LOGIN_WRAPPER);
    this.titleHint = this.createElement(TagNames.H5, Styles.TITLE_HINT);
    this.buttonLogin = new Button(TypeButton.LOGIN);
    this.popup = new Popup();
    this.api = api;

    this.createComponent();
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

  private createComponent(): void {
    const { form, title, fieldSetPersonal, fieldSetShipping, fieldSetBilling, button } = this;
    const { loginContainer, titleHint, buttonLogin } = this;

    const fieldsetPersonalElement: HTMLElement = fieldSetPersonal.getElement();
    const fieldSetShippingElement: HTMLElement = fieldSetShipping.getElement();
    const fieldSetBillingElement: HTMLElement = fieldSetBilling.getElement();

    const buttonElement: HTMLElement = button.getElement();
    const buttonLoginElem: HTMLElement = buttonLogin.getElement();

    const checkboxShip: HTMLElement = this.checkboxShipping.getElement();
    const checkboxBill: HTMLElement = this.checkboxBilling.getElement();
    const checkboxBillDef: HTMLElement = this.checkboxBillDef.getElement();
    const checkboxShipDef: HTMLElement = this.checkboxShipDef.getElement();
    const checkboxShipInput: HTMLInputElement = this.checkboxShipping.getCheckboxElement();
    const checkboxBillInput: HTMLInputElement = this.checkboxBilling.getCheckboxElement();

    title.innerText = Content.TITLE;
    titleHint.innerText = Content.TITLE_HINT;
    fieldSetShippingElement.append(checkboxShipDef);
    fieldSetShippingElement.append(checkboxShip);
    fieldSetBillingElement.append(checkboxBillDef);
    fieldSetBillingElement.append(checkboxBill);

    [titleHint, buttonLoginElem].forEach((el: HTMLElement): void => loginContainer.append(el));

    [
      title,
      fieldsetPersonalElement,
      fieldSetShippingElement,
      fieldSetBillingElement,
      buttonElement,
      loginContainer,
    ].forEach((el: HTMLElement): void => form.append(el));

    this.addSubmitHandler(buttonElement);
    this.addClickHandler(buttonLoginElem);
    this.addChangeCheckboxHandler(checkboxShipInput, checkboxBillInput);
  }

  private addSubmitHandler(button: HTMLElement): void {
    button.addEventListener(Events.CLICK, (e: Event): void => {
      e.preventDefault();

      const isValidForm: boolean = this.isValidForm();

      if (isValidForm) {
        const userData: IUserData = this.getData();
        const { email, password } = userData;

        this.api
          .registerUser(userData)
          .then(() => {
            this.api.loginUserPassFlow(email, password).then(() => {
              this.popup.showRegistrationMessage();
              this.redirectToMain();
            });
          })
          .catch(() => {
            this.popup.showRegistrationErrorMessage();
            this.fieldSetPersonal.showHintUserExist();
          });
      }
    });
  }

  // eslint-disable-next-line
  private getData(): IUserData {
    const personalData: string[] = this.fieldSetPersonal.getData();
    const billingData: string[] | null = this.fieldSetBilling.getData();
    const shippingData: string[] | null = this.fieldSetShipping.getData();

    const userData: IUserData = {
      addresses: [],
      email: personalData[0],
      firstName: personalData[1],
      lastName: personalData[2],
      dateOfBirth: personalData[3],
      password: personalData[4],
      shippingAddresses: [0],
      billingAddresses: [0],
    };

    if (shippingData) {
      const shippingAddress: IAddress = this.createAdrress(shippingData);

      if (this.checkboxShipDef.getCheckboxElement().checked) {
        userData.defaultShippingAddress = 0;
      }

      userData.addresses.push(shippingAddress);
    }

    if (billingData) {
      const billingAddress: IAddress = this.createAdrress(billingData);

      if (shippingData) {
        userData.billingAddresses = [1];

        if (this.checkboxBillDef.getCheckboxElement().checked) {
          userData.defaultBillingAddress = 1;
        }
      } else {
        if (this.checkboxBillDef.getCheckboxElement().checked) {
          userData.defaultBillingAddress = 0;
        }
      }

      userData.addresses.push(billingAddress);
    }

    return userData;
  }

  private createAdrress(address: string[]): IAddress {
    return {
      streetName: address[0],
      streetNumber: address[1],
      city: address[2],
      postalCode: address[3],
      country: address[4],
    };
  }

  private isValidForm(): boolean {
    const isValidPersonal: boolean = this.fieldSetPersonal.isValidData();
    const isValidBilling: boolean = this.fieldSetBilling.isValidData();
    const isValidShipping: boolean = this.fieldSetShipping.isValidData();

    return isValidPersonal && isValidBilling && isValidShipping;
  }

  private addClickHandler(button: HTMLElement): void {
    button.addEventListener(Events.CLICK, (e: Event): void => {
      e.preventDefault();

      this.redirectToAuthorization();
    });
  }

  private addChangeCheckboxHandler(
    checkboxShipping: HTMLInputElement,
    checkboxBilling: HTMLInputElement
  ): void {
    checkboxShipping.addEventListener(Events.CLICK, (): void => {
      if (checkboxShipping.checked) {
        this.fieldSetBilling.hideFromScreen();
        this.checkboxShipping.showHintDefaultAddress(Content.ONLY_ONE_ADDRESS);
      } else {
        this.fieldSetBilling.showOnScreen();
        this.checkboxShipping.hideHintDefaultAddress();
      }
    });
    checkboxBilling.addEventListener(Events.CLICK, (): void => {
      if (checkboxBilling.checked) {
        this.fieldSetShipping.hideFromScreen();
        this.checkboxBilling.showHintDefaultAddress(Content.ONLY_ONE_ADDRESS);
      } else {
        this.fieldSetShipping.showOnScreen();
        this.checkboxBilling.hideHintDefaultAddress();
      }
    });
  }

  private redirectToMain(): void {
    if (this.router && this.stateManager) {
      history.pushState(null, '', this.pathToMain);
      this.router.router();
      this.stateManager.changeAuthorizationStatus();
    }
  }

  private redirectToAuthorization(): void {
    if (this.router) {
      history.pushState(null, '', this.pathToAuthorization);
      this.router.router();
    }
  }
}

export default RegistrationForm;
