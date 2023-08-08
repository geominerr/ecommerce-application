import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import CheckboxCustom from '../checkbox-custom/checkbox-custom';
import { TagNames, Styles, Attributes, Events } from './enum';
import './input-password.scss';

type CallbackStub = (inuptValue: string) => string | false;

class InputPassword extends BaseComponent {
  private container: HTMLElement;

  private input: HTMLInputElement;

  private customCheckbox: CheckboxCustom;

  private errorHint: ErrorHint;

  private validator: CallbackStub;

  constructor(validator: CallbackStub) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.INPUT_CONTAINER);
    this.input = this.createElement<HTMLInputElement>(TagNames.INPUT, Styles.INPUT);
    this.customCheckbox = new CheckboxCustom().createComponent();
    this.errorHint = new ErrorHint();

    this.validator = validator;
  }

  public createComponent(): this {
    const { input, customCheckbox, errorHint } = this;
    const errorHintElement: HTMLElement = errorHint.getElement();
    const customCheckboxContainer: HTMLElement = customCheckbox.getElement();
    const checkboxElement: HTMLInputElement = customCheckbox.getCheckboxElement();

    input.setAttribute(Attributes.TYPE, Attributes.TYPE_VALUE_PASS);
    input.setAttribute(Attributes.PLACEHOLDER, Attributes.PLACEHOLDER_VALUE_PASS);
    input.classList.add(Styles.INPUT_PASS);

    [input, customCheckboxContainer, errorHintElement].forEach((el: HTMLElement): void =>
      this.container.append(el)
    );

    this.addInputHadler(input);
    this.addChangeHadler(input, checkboxElement);

    return this;
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private addInputHadler(input: HTMLInputElement): void {
    input.addEventListener(Events.INPUT, (): void => {
      const inputValue: string = input.value;
      const errorText: string | false = this.validator(inputValue);

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
