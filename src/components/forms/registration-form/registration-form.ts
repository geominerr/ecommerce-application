import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset/fieldset-billing-address/fieldset-billing-address';
import Button from '../button/button';
import CheckboxComponent from '../checkbox/checkbox';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles, Content, Events, Attributes } from './enum';

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

  private api: APIUserActions;

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
    this.button = new Button('signup');
    this.checkboxShipping = new CheckboxComponent(Content.LABEL, Attributes.ID_VALUE_CHECKBOX_SHIP);
    this.checkboxBilling = new CheckboxComponent(Content.LABEL, Attributes.ID_VALUE_CHECKBOX_BILL);
    this.api = api;

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private createComponent(): void {
    const { form, title, fieldSetPersonal, fieldSetShipping, fieldSetBilling, button } = this;

    const fieldsetPersonalElement: HTMLElement = fieldSetPersonal.getElement();
    const fieldSetShippingElement: HTMLElement = fieldSetShipping.getElement();
    const fieldSetBillingElement: HTMLElement = fieldSetBilling.getElement();

    const buttonElement: HTMLElement = button.getElement();

    title.innerText = Content.TITLE;
    fieldSetShippingElement.append(this.checkboxShipping.getElement());
    fieldSetBillingElement.append(this.checkboxBilling.getElement());

    [
      title,
      fieldsetPersonalElement,
      fieldSetShippingElement,
      fieldSetBillingElement,
      buttonElement,
    ].forEach((el: HTMLElement): void => form.append(el));

    const checkboxShip: HTMLInputElement = this.checkboxShipping.getCheckboxElement();
    const checkboxBill: HTMLInputElement = this.checkboxBilling.getCheckboxElement();

    this.addSubmitButton(buttonElement);
    this.addChangeCheckboxHandler(checkboxShip, checkboxBill);
  }

  private addSubmitButton(button: HTMLElement): void {
    button.addEventListener(Events.CLICK, (e: Event): void => {
      e.preventDefault();

      this.fieldSetPersonal.getElement().classList.add('close');
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
}

export default RegistrationForm;
