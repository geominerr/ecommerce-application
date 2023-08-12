import BaseComponent from '../../../base/base-component/base-component';
import InputBase from '../../input-base/input-base';
import InputPassword from '../../input-password/input-password';
import { AddressCheck } from '../../../../utils/address_check';
import { EmailPasswordCheck } from '../../../../utils/email_password_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import './fieldset.scss';

class FieldsetPersonal extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private inputMail: InputBase;

  private inputFirstName: InputBase;

  private inputLastName: InputBase;

  private inputDateBirth: InputBase;

  private inputPassword: InputPassword;

  private inputPasswordRepeat: InputPassword;

  private allInputs: (InputBase | InputPassword)[] = [];

  constructor(validatorPass: EmailPasswordCheck, validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.inputMail = new InputBase(validatorPass.emailCheck, OPTIONS[0]);
    this.inputFirstName = new InputBase(validatorAdrress.mainCheck, OPTIONS[1]);
    this.inputLastName = new InputBase(validatorAdrress.mainCheck, OPTIONS[2]);
    this.inputDateBirth = new InputBase(validatorAdrress.ageCheck, OPTIONS[3]);
    this.inputPassword = new InputPassword(validatorPass, OPTIONS[4]);
    this.inputPasswordRepeat = new InputPassword(validatorPass, OPTIONS[5]);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public isValid(): boolean {
    const { allInputs } = this;

    if (allInputs) {
      return allInputs.every((input: InputBase | InputPassword): boolean => input.isValid());
    }

    return false;
  }

  private createComponent(): void {
    const {
      fieldsetElement,
      legendElement,
      inputMail,
      inputFirstName,
      inputLastName,
      inputDateBirth,
      inputPassword,
      inputPasswordRepeat,
      allInputs,
    } = this;

    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [
      inputMail,
      inputFirstName,
      inputLastName,
      inputDateBirth,
      inputPassword,
      inputPasswordRepeat,
    ].forEach((input: InputBase | InputPassword): void => {
      allInputs.push(input);
      fieldsetElement.append(input.getElement());
    });
  }
}

export default FieldsetPersonal;
