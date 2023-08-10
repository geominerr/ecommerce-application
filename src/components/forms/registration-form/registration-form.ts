import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset/fieldset-personal-info/fieldset-personal-info';
import Button from '../button/button';
import { TagNames, Styles, Content, Events } from './enum';
import './registration-form.scss';
import FieldsetShip from '../fieldset/fieldset-shipping-address/fieldset-shipping-address';
import FieldsetBill from '../fieldset/fieldset-billing-address/fieldset-billing-address';

const validator = (data: string): string | null => {
  const randomNumber: number = Math.floor(Math.random() * 10);
  console.log(data);

  if (randomNumber <= 5) {
    return 'Not correct email address';
  }

  return null;
};

class RegistrationForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private fieldSetPersonal: FieldsetPersonal;

  private fieldSetShipping: FieldsetShip;

  private fieldSetBilling: FieldsetBill;

  private button: Button;

  constructor() {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.fieldSetPersonal = new FieldsetPersonal(validator);
    this.fieldSetShipping = new FieldsetShip(validator);
    this.fieldSetBilling = new FieldsetBill(validator);
    this.button = new Button('signup');

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
