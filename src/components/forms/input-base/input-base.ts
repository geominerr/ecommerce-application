import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import { TagNames, Styles, Attributes, Events } from './enum';
import { CallbackStub, InputOptions } from './input-base-interfaces';
import './input-base.scss';

class InputBase extends BaseComponent {
  private container: HTMLElement;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private errorHint: ErrorHint;

  private validator: CallbackStub;

  constructor(validator: CallbackStub, options: InputOptions) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.INPUT_CONTAINER);
    this.label = this.createElement(TagNames.LABEL, Styles.LABEL);
    this.input = this.createElement<HTMLInputElement>(TagNames.INPUT, Styles.INPUT);
    this.errorHint = new ErrorHint();

    this.validator = validator;

    this.createComponent(options);
  }

  private createComponent(options: InputOptions): void {
    const { container, label, input, errorHint } = this;
    const errorHintElement: HTMLElement = errorHint.getElement();

    input.setAttribute(Attributes.ID, options.ID);
    input.setAttribute(Attributes.TYPE, options.TYPE);
    input.setAttribute(Attributes.NAME, options.NAME);
    label.setAttribute(Attributes.FOR, options.ID);
    input.setAttribute(Attributes.PLACEHOLDER, options.PLACEHOLDER);
    label.innerText = options.CONTENT_LABEL;

    [label, input, errorHintElement].forEach((el: HTMLElement): void => container.append(el));
    this.addInputHadler(input);
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

export default InputBase;