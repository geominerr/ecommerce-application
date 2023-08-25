import BaseComponent from '../../../base/base-component/base-component';
import InputBase from '../../input-base/input-base';
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

  private allInputs: InputBase[] = [];

  constructor(validatorPass: EmailPasswordCheck, validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.inputMail = new InputBase(validatorPass.emailCheck, OPTIONS[0]);
    this.inputFirstName = new InputBase(validatorAdrress.firstNameCheck, OPTIONS[1]);
    this.inputLastName = new InputBase(validatorAdrress.lastNameCheck, OPTIONS[2]);
    this.inputDateBirth = new InputBase(validatorAdrress.ageCheck, OPTIONS[3]);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public showHintUserExist(): void {
    this.inputMail.showHintUserExist();
  }

  public getData(): string[] {
    const { inputMail, inputFirstName, inputLastName, inputDateBirth } = this;

    const result: string[] = [];

    [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input): number =>
      result.push(input.getValue())
    );

    return result;
  }

  public isValidData(): boolean {
    const { inputMail, inputFirstName, inputLastName, inputDateBirth } = this;

    const isValid: boolean = [inputMail, inputFirstName, inputLastName, inputDateBirth].every(
      (input): boolean => input.isValid()
    );

    if (!isValid) {
      [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input): void =>
        input.showHintRequiredFieldIsEmpty()
      );
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
      allInputs,
    } = this;

    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input: InputBase): void => {
      allInputs.push(input);
      fieldsetElement.append(input.getElement());
    });
  }
}

export default FieldsetPersonal;
