import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import { TagNames, Styles, Attributes, Contents, Events } from './enum';
import './input-mail.scss';

// удалить после того как будет util: Validator
type CallbackStub = (inuptValue: string) => string | null;

class InputMail extends BaseComponent {
  private container: HTMLElement;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private errorHint: ErrorHint;

  private validator: CallbackStub;

  constructor(validator: CallbackStub) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.INPUT_CONTAINER);
    this.label = this.createElement(TagNames.LABEL, Styles.LABEL);
    this.input = this.createElement<HTMLInputElement>(TagNames.INPUT, Styles.INPUT);
    this.errorHint = new ErrorHint();

    this.validator = validator;
  }

  public createComponent(): this {
    const { container, label, input, errorHint } = this;
    const errorHintElement: HTMLElement = errorHint.getElement();

    input.setAttribute(Attributes.ID, Attributes.ID_VALUE_INPUT);
    input.setAttribute(Attributes.PLACEHOLDER, Attributes.PLACEHOLDER_VALUE);
    input.setAttribute(Attributes.NAME, Attributes.NAME_VALUE);
    label.setAttribute(Attributes.FOR, Attributes.ID_VALUE_INPUT);
    label.innerText = Contents.LABEL;

    [label, input, errorHintElement].forEach((el: HTMLElement): void => container.append(el));
    this.addInputHadler(input);

    return this;
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public isValid(): boolean {
    return !this.input.classList.contains(Styles.INPUT_ERROR);
  }

  private addInputHadler(input: HTMLInputElement): void {
    input.addEventListener(Events.INPUT, (): void => {
      const inputValue: string = input.value;
      const errorText: string | null = this.validator(inputValue);

      if (errorText) {
        input.classList.add(Styles.INPUT_ERROR);
        this.errorHint.showErrorText(errorText);
      } else {
        input.classList.remove(Styles.INPUT_ERROR);
        this.errorHint.hideErrorText();
      }
    });
  }
}

export default InputMail;
