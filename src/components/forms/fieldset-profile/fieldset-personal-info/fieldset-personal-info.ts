import BaseComponent from '../../../base/base-component/base-component';
import InputBase from '../../input-profile/input-base/input-base';
import { AddressCheck } from '../../../../utils/address_check';
import { EmailPasswordCheck } from '../../../../utils/email_password_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import './fieldset.scss';

class FieldsetPersonal extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private titleContainer: HTMLDivElement;

  private legendElement: HTMLLegendElement;

  public edit: HTMLImageElement;

  public inputMail: InputBase;

  public inputFirstName: InputBase;

  public inputLastName: InputBase;

  public inputDateBirth: InputBase;

  private buttonsContainer: HTMLDivElement;

  public buttonCancel: HTMLButtonElement;

  public buttonSave: HTMLButtonElement;

  private allInputs: InputBase[] = [];

  constructor(validatorPass: EmailPasswordCheck, validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.titleContainer = this.createElement(TagNames.DIV, Styles.TITLE_CONTAINER);
    this.buttonsContainer = this.createElement(TagNames.DIV, Styles.BUTTONS_CONTAINER);
    this.buttonCancel = this.createElement(TagNames.BUTTON, Styles.BUTTON_CANCEL);
    this.buttonCancel.innerHTML = 'Cancel';
    this.buttonSave = this.createElement(TagNames.BUTTON, Styles.BUTTON_SAVE);
    this.buttonSave.innerHTML = 'Save';
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.edit = this.createElement(TagNames.IMG, Styles.EDIT);
    this.edit.setAttribute('src', '../../../../assets/svg/edit.svg');
    this.inputMail = new InputBase(validatorPass.emailCheck, OPTIONS[0]);
    this.inputFirstName = new InputBase(validatorAdrress.firstNameCheck, OPTIONS[1]);
    this.inputLastName = new InputBase(validatorAdrress.lastNameCheck, OPTIONS[2]);
    this.inputDateBirth = new InputBase(validatorAdrress.ageCheck, OPTIONS[3]);

    this.createComponent();
  }

  public inputDisable(): void {
    [this.inputFirstName, this.inputLastName, this.inputMail, this.inputDateBirth].forEach(
      (input) => input.inputDisable()
    );
  }

  public inputEnable(): void {
    [this.inputFirstName, this.inputLastName, this.inputMail, this.inputDateBirth].forEach(
      (input) => input.inputEnable()
    );
  }

  public hideFromScreen(): void {
    this.buttonsContainer.classList.remove(Styles.BUTTONS_SHOW);
  }

  public showOnScreen(): void {
    this.buttonsContainer.classList.add(Styles.BUTTONS_SHOW);
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
    this.titleContainer.append(legendElement, this.edit);
    fieldsetElement.append(this.titleContainer);
    this.buttonsContainer.append(this.buttonCancel, this.buttonSave);

    [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input: InputBase): void => {
      allInputs.push(input);
      fieldsetElement.append(input.getElement());
      fieldsetElement.append(this.buttonsContainer);
    });
  }

  public setInputValues(
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string
  ): void {
    this.inputMail.setValue(email);
    this.inputFirstName.setValue(firstName);
    this.inputLastName.setValue(lastName);
    this.inputDateBirth.setValue(dateOfBirth);
  }

  public getInputValues(): string[] {
    const values: string[] = [];
    values.push(this.inputMail.getValue());
    values.push(this.inputFirstName.getValue());
    values.push(this.inputLastName.getValue());
    values.push(this.inputDateBirth.getValue());
    return values;
  }
}

export default FieldsetPersonal;
