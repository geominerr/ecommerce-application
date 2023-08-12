import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset/fieldset-personal-info/fieldset-personal-info';
import FieldsetShip from '../fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset/fieldset-billing-address/fieldset-billing-address';
import Button from '../button/button';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles, Content, Events } from './enum';
import './registration-form.scss';

class RegistrationForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShipping: FieldsetShip;

  private fieldSetBilling: FieldsetBill;

  private button: Button;

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

    console.log(fieldsetPersonalElement);

    title.innerText = Content.TITLE;

    [
      title,
      fieldsetPersonalElement,
      fieldSetShippingElement,
      fieldSetBillingElement,
      buttonElement,
    ].forEach((el: HTMLElement): void => form.append(el));
  }

  private addSubmitButton(button: HTMLButtonElement): void {
    button.addEventListener(Events.CLICK, (e: Event): void => {
      e.preventDefault();

      this.fieldSetPersonal.getElement().classList.add('close');
    });
  }
}

export default RegistrationForm;
