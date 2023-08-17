import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset/fieldset-billing-address/fieldset-billing-address';
import Button from '../button/button';
import CheckboxComponent from '../checkbox/checkbox';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles, Content, Events, Attributes, TypeButton } from './enum';
import './registration-form.scss';

class RegistrationForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShipping: FieldsetShip;

  private fieldSetBilling: FieldsetBill;

  private button: Button;

  private checkboxShipping: CheckboxComponent;

  private checkboxBilling: CheckboxComponent;

  private loginContainer: HTMLDivElement;

  private titleHint: HTMLHeadElement;

  private buttonLogin: Button;

  private api: APIUserActions;

  private router: Router | null = null;

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
    this.checkboxShipping = new CheckboxComponent(Content.LABEL, Attributes.ID_VALUE_CHECKBOX_SHIP);
    this.checkboxBilling = new CheckboxComponent(Content.LABEL, Attributes.ID_VALUE_CHECKBOX_BILL);
    this.loginContainer = this.createElement(TagNames.DIV, Styles.LOGIN_WRAPPER);
    this.titleHint = this.createElement(TagNames.H5, Styles.TITLE_HINT);
    this.buttonLogin = new Button(TypeButton.LOGIN);
    this.api = api;

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  private createComponent(): void {
    const { form, title, fieldSetPersonal, fieldSetShipping, fieldSetBilling, button } = this;
    const { loginContainer, titleHint, buttonLogin } = this;

    const fieldsetPersonalElement: HTMLElement = fieldSetPersonal.getElement();
    const fieldSetShippingElement: HTMLElement = fieldSetShipping.getElement();
    const fieldSetBillingElement: HTMLElement = fieldSetBilling.getElement();

    const buttonElement: HTMLElement = button.getElement();
    const buttonLoginElem: HTMLElement = buttonLogin.getElement();

    title.innerText = Content.TITLE;
    titleHint.innerText = Content.TITLE_HINT;
    fieldSetShippingElement.append(this.checkboxShipping.getElement());
    fieldSetBillingElement.append(this.checkboxBilling.getElement());

    [titleHint, buttonLoginElem].forEach((el: HTMLElement): void => loginContainer.append(el));

    [
      title,
      fieldsetPersonalElement,
      fieldSetShippingElement,
      fieldSetBillingElement,
      buttonElement,
      loginContainer,
    ].forEach((el: HTMLElement): void => form.append(el));

    const checkboxShip: HTMLInputElement = this.checkboxShipping.getCheckboxElement();
    const checkboxBill: HTMLInputElement = this.checkboxBilling.getCheckboxElement();

    this.addSubmitHandler(buttonElement);
    this.addClickHandler(buttonLoginElem);
    this.addChangeCheckboxHandler(checkboxShip, checkboxBill);
  }

  private addSubmitHandler(button: HTMLElement): void {
    button.addEventListener(Events.CLICK, (e: Event): void => {
      e.preventDefault();

      const isValidPersonal: boolean = this.fieldSetPersonal.isValidData();
      const isValidBilling: boolean = this.fieldSetBilling.isValidData();
      const isValidShipping: boolean = this.fieldSetShipping.isValidData();

      if (isValidPersonal && isValidBilling && isValidShipping) {
        const personalData: string[] = this.fieldSetPersonal.getData();
        const email: string = personalData[0];
        const password: string = personalData[4];
        let billingData: string[] | null = this.fieldSetBilling.getData();
        let shippingData: string[] | null = this.fieldSetShipping.getData();
        let dataUser: string[] = [];

        if (billingData && !shippingData) {
          shippingData = billingData;
        } else if (!billingData && shippingData) {
          billingData = shippingData;
        }

        if (billingData && shippingData) {
          dataUser = [...shippingData, ...billingData, ...personalData];
        }
        // eslint-disable-next-line
        this.api // @ts-ignore
          .registerUser(...dataUser) // <= c этим надо что то делать :-)
          .then(() => {
            this.api
              .loginUser(email, password)
              .then(() => this.redirectToMain())
              .catch();
          })
          .catch(() => {
            this.fieldSetPersonal.showHintUserExist();
          });
      }
    });
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
        this.checkboxShipping.showHintDefaultAddress(Content.DEFAULT_SHIP_ADDRESS);
      } else {
        this.fieldSetBilling.showOnScreen();
        this.checkboxShipping.hideHintDefaultAddress();
      }
    });
    checkboxBilling.addEventListener(Events.CLICK, (): void => {
      if (checkboxBilling.checked) {
        this.fieldSetShipping.hideFromScreen();
        this.checkboxBilling.showHintDefaultAddress(Content.DEFAULT_BILL_ADDRESS);
      } else {
        this.fieldSetShipping.showOnScreen();
        this.checkboxBilling.hideHintDefaultAddress();
      }
    });
  }

  private redirectToMain(): void {
    if (this.router) {
      history.pushState(null, '', this.pathToMain);
      this.router.router();
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
