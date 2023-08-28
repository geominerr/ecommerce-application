import BaseComponent from '../../../base/base-component/base-component';
import ErrorHint from '../../error-hint/error-hint';
import CheckboxCustom from '../../checkbox-custom/checkbox-custom';
import { EmailPasswordCheck } from '../../../../utils/email_password_check';
import { InputOptions } from './input-password-interfaces';
import { TagNames, Styles, Attributes, Events } from './enum';
import { ValidationFunction } from '../../../../types/general/general';
import './input-password.scss';

class InputPassword extends BaseComponent {
  private container: HTMLElement;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private customCheckbox: CheckboxCustom;

  private errorHint: ErrorHint;

  private validatorPass: ValidationFunction;

  private validatorPassStrength: ValidationFunction;

  private hintRequiredField: string = 'This is a required field';

  private hintUserNotFound: string = 'Invalid email or password. Please try again!';

  private hintNotCorfimPassword: string = 'Your passwords are different';

  constructor(validator: EmailPasswordCheck, options: InputOptions) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.INPUT_CONTAINER);
    this.label = this.createElement(TagNames.LABEL, Styles.LABEL);
    this.input = this.createElement<HTMLInputElement>(TagNames.INPUT, Styles.INPUT);
    this.customCheckbox = new CheckboxCustom().createComponent();
    this.errorHint = new ErrorHint();
    this.validatorPass = validator.passwordCheck;
    this.validatorPassStrength = validator.strengthOfPasswordCheck;

    this.createComponent(options);
  }

  private createComponent(options: InputOptions): void {
    const { container, label, input, customCheckbox, errorHint } = this;
    const errorHintElement: HTMLElement = errorHint.getElement();
    const customCheckboxContainer: HTMLElement = customCheckbox.getElement();
    const checkboxElement: HTMLInputElement = customCheckbox.getCheckboxElement();

    input.setAttribute(Attributes.ID, options.ID);
    input.setAttribute(Attributes.TYPE, options.TYPE);
    input.setAttribute(Attributes.NAME, options.NAME);
    input.setAttribute(Attributes.PLACEHOLDER, options.PLACEHOLDER);

    label.setAttribute(Attributes.FOR, options.ID);
    label.innerText = options.CONTENT_LABEL;

    [label, input, customCheckboxContainer, errorHintElement].forEach((el: HTMLElement): void =>
      container.append(el)
    );

    this.addInputHadler(input);
    this.addChangeHadler(input, checkboxElement);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public isValid(): boolean {
    if (!this.input.value) {
      return false;
    }

    return !this.input.classList.contains(Styles.INPUT_ERROR);
  }

  public getValue(): string {
    return this.input.value;
  }

  public getInputElement(): HTMLInputElement {
    return this.input;
  }

  public showHintRequiredFieldIsEmpty(): void {
    if (!this.input.value) {
      this.input.classList.add(Styles.INPUT_ERROR);
      this.errorHint.showErrorText(this.hintRequiredField);
    }
  }

  public showHintNotFoundUser(): void {
    this.input.value = '';
    this.input.classList.add(Styles.INPUT_ERROR);
    this.errorHint.showErrorText(this.hintUserNotFound);
  }

  public showHintNotConfirmPass(): void {
    this.input.classList.add(Styles.INPUT_ERROR);
    this.errorHint.showErrorText(this.hintNotCorfimPassword);
  }

  public hideHintNotConfirmPass(): void {
    this.input.classList.remove(Styles.INPUT_ERROR);
    this.errorHint.hideErrorText();
  }

  private addInputHadler(input: HTMLInputElement): void {
    input.addEventListener(Events.INPUT, (): void => {
      const inputValue: string = input.value;
      const errorText: string | null = this.validatorPass(inputValue);

      if (inputValue.length >= 8 && !errorText) {
        const passHint: string = this.validatorPassStrength(inputValue) as string;

        this.errorHint.showPassHint(passHint);
      }

      if (errorText) {
        input.classList.add(Styles.INPUT_ERROR);
        this.errorHint.showErrorText(errorText);
      } else {
        input.classList.remove(Styles.INPUT_ERROR);
        this.errorHint.hideErrorText();
      }
    });
  }

  private addChangeHadler(input: HTMLInputElement, checkBox: HTMLInputElement): void {
    checkBox.addEventListener(Events.CHANGE, (): void => {
      if (checkBox.checked) {
        input.type = Attributes.TYPE_VALUE_TEXT;
      } else {
        input.type = Attributes.TYPE_VALUE_PASS;
      }
    });
  }
}

export default InputPassword;
