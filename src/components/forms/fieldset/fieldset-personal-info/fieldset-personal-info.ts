import BaseComponent from '../../../base/base-component/base-component';
import InputBase from '../../input-base/input-base';
import InputPassword from '../../input-password/input-password';
import { AddressCheck } from '../../../../utils/address_check';
import { EmailPasswordCheck } from '../../../../utils/email_password_check';
import { TagNames, Styles, Contents, Events } from './enum';
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
    this.inputFirstName = new InputBase(validatorAdrress.firstNameCheck, OPTIONS[1]);
    this.inputLastName = new InputBase(validatorAdrress.lastNameCheck, OPTIONS[2]);
    this.inputDateBirth = new InputBase(validatorAdrress.ageCheck, OPTIONS[3]);
    this.inputPassword = new InputPassword(validatorPass, OPTIONS[4]);
    this.inputPasswordRepeat = new InputPassword(validatorPass, OPTIONS[5]);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public showHintUserExist(): void {
    this.inputMail.showHintUserExist();
  }

  public getData(): string[] {
    const { inputMail, inputFirstName, inputLastName, inputDateBirth, inputPassword } = this;

    const result: string[] = [];

    [inputMail, inputFirstName, inputLastName, inputDateBirth, inputPassword].forEach(
      (input): number => result.push(input.getValue())
    );

    return result;
  }

  public isValidData(): boolean {
    const {
      inputMail,
      inputFirstName,
      inputLastName,
      inputDateBirth,
      inputPassword,
      inputPasswordRepeat,
    } = this;

    const isValid: boolean = [
      inputMail,
      inputFirstName,
      inputLastName,
      inputDateBirth,
      inputPassword,
      inputPasswordRepeat,
    ].every((input): boolean => input.isValid());

    if (!isValid) {
      [
        inputMail,
        inputFirstName,
        inputLastName,
        inputDateBirth,
        inputPassword,
        inputPasswordRepeat,
      ].forEach((input): void => input.showHintRequiredFieldIsEmpty());
    }

    return isValid;
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

    this.addCheckIndentityPasswords();
  }

  private addCheckIndentityPasswords(): void {
    const inputPass: HTMLInputElement = this.inputPassword.getInputElement();
    const inputConfirm: HTMLInputElement = this.inputPasswordRepeat.getInputElement();

    inputConfirm.addEventListener(Events.INPUT, (): void => {
      const valueInputPass: string = inputPass.value;
      const valueInputConfirm: string = inputConfirm.value;
      const isSameLength: boolean = valueInputPass.length === valueInputConfirm.length;
      const isIndenticalValue: boolean = valueInputPass === valueInputConfirm;

      if (
        this.inputPassword.isValid() &&
        this.inputPasswordRepeat.isValid() &&
        !(isSameLength || isIndenticalValue)
      ) {
        this.inputPasswordRepeat.showHintNotConfirmPass();
      }
    });
  }
}

export default FieldsetPersonal;
