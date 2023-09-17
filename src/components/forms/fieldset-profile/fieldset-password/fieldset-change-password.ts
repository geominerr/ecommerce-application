import BaseComponent from '../../../base/base-component/base-component';
import InputPassword from '../../input-password/input-password';
import { EmailPasswordCheck } from '../../../../utils/email_password_check';
import { TagNames, Styles, Events } from './enum';
import { OPTIONS } from './input-options';
import './fieldset.scss';

class FieldsetPassword extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private inputPassword: InputPassword;

  private inputNewPassword: InputPassword;

  private inputPasswordRepeat: InputPassword;

  private buttonsContainer: HTMLDivElement;

  public buttonCancel: HTMLButtonElement;

  public buttonSave: HTMLButtonElement;

  private allInputs: InputPassword[] = [];

  constructor(validatorPass: EmailPasswordCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);

    this.inputPassword = new InputPassword(validatorPass, OPTIONS[0]);
    this.inputNewPassword = new InputPassword(validatorPass, OPTIONS[1]);
    this.inputPasswordRepeat = new InputPassword(validatorPass, OPTIONS[2]);
    this.buttonsContainer = this.createElement(TagNames.DIV, Styles.BUTTONS_CONTAINER);
    this.buttonCancel = this.createElement(TagNames.BUTTON, Styles.BUTTON_CANCEL);
    this.buttonCancel.innerHTML = 'Cancel';
    this.buttonSave = this.createElement(TagNames.BUTTON, Styles.BUTTON_SAVE);
    this.buttonSave.innerHTML = 'Save';

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public getData(): string[] {
    const { inputNewPassword } = this;

    const result: string[] = [];

    [inputNewPassword].forEach((input): number => result.push(input.getValue()));

    return result;
  }

  public isValidData(): boolean {
    const { inputPassword, inputNewPassword, inputPasswordRepeat } = this;

    const isValid: boolean = [inputPassword, inputNewPassword, inputPasswordRepeat].every(
      (input): boolean => input.isValid()
    );

    if (!isValid) {
      [inputPassword, inputNewPassword, inputPasswordRepeat].forEach((input): void =>
        input.showHintRequiredFieldIsEmpty()
      );
    }

    return isValid;
  }

  private createComponent(): void {
    const { fieldsetElement, inputPassword, inputNewPassword, inputPasswordRepeat, allInputs } =
      this;

    [inputPassword, inputNewPassword, inputPasswordRepeat].forEach((input: InputPassword): void => {
      allInputs.push(input);
      fieldsetElement.append(input.getElement());
    });

    this.buttonsContainer.append(this.buttonCancel, this.buttonSave);

    fieldsetElement.append(this.buttonsContainer);
    this.addCheckIndentityPasswords();
  }

  private addCheckIndentityPasswords(): void {
    const inputNewPass: HTMLInputElement = this.inputNewPassword.getInputElement();
    const inputConfirm: HTMLInputElement = this.inputPasswordRepeat.getInputElement();

    const checkPasswords = (): void => {
      const valueInputNewPass: string = inputNewPass.value;
      const valueInputConfirm: string = inputConfirm.value;
      const isIndenticalValue: boolean = valueInputNewPass === valueInputConfirm;
      const inputLength: boolean = valueInputNewPass.length >= 8 && valueInputConfirm.length >= 8;

      if (
        isIndenticalValue &&
        (this.inputNewPassword.isValid() || this.inputPasswordRepeat.isValid())
      ) {
        this.inputPasswordRepeat.hideHintNotConfirmPass();
      } else if (inputLength && !isIndenticalValue) {
        this.inputPasswordRepeat.showHintNotConfirmPass();
      }
    };

    inputNewPass.addEventListener(Events.INPUT, checkPasswords);
    inputConfirm.addEventListener(Events.INPUT, checkPasswords);
  }

  public getInputValues(): {
    currentPassword: string;
    newPassword: string;
  } {
    const currentPassword = this.inputPassword.getValue();
    const newPassword = this.inputNewPassword.getValue();

    return { currentPassword, newPassword };
  }

  public clearPassword(): void {
    this.inputPassword.clearValue();
    this.inputNewPassword.clearValue();
    this.inputPasswordRepeat.clearValue();
  }

  public hidePassword(): void {
    this.fieldsetElement.classList.remove(Styles.FIELDSET_SHOW);
  }

  public showPassword(): void {
    this.fieldsetElement.classList.add(Styles.FIELDSET_SHOW);
  }
}

export default FieldsetPassword;
