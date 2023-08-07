import BaseComponent from '../base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import { TagNames, Styles, Events } from './enum';

type CallbackStub = (inuptValue: string) => string | false;

class InputMail extends BaseComponent {
  private container: HTMLDivElement;

  private input: HTMLInputElement;

  private errorHint: ErrorHint;

  private validator: CallbackStub;

  constructor(validator: CallbackStub) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.INPUT_CONTAINER);
    this.input = this.createElement<HTMLInputElement>(TagNames.INPUT, Styles.INPUT);
    this.errorHint = new ErrorHint();

    this.validator = validator;
  }

  public createComponent(): this {
    const { container, input, errorHint } = this;
    const errorHintElement: HTMLElement = errorHint.getElement();

    [input, errorHintElement].forEach((el: HTMLElement): void => container.append(el));
    this.addInputHadler(input);

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
}

export default InputMail;
