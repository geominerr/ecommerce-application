import BaseComponent from '../../../base/base-component/base-component';
import ErrorHint from '../../error-hint/error-hint';
import { TagNames, Styles, Attributes, Events } from './enum';
import { InputOptions } from './input-postal-interfaces';
import { ValidationPostal } from '../../../../types/general/general';
import SelectComponentProfile from '../../select-profile/select';
import './input-postal.scss';

class InputPostal extends BaseComponent {
  private container: HTMLElement;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private errorHint: ErrorHint;

  private validator: ValidationPostal;

  private selectComponent: SelectComponentProfile | null = null;

  private hintRequiredField: string = 'This is a required field';

  private hintUserNotFound: string = 'Invalid email or password. Please try again!';

  constructor(validator: ValidationPostal, options: InputOptions) {
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

  public inputDisable(): void {
    // Set the value of the input element
    this.input.disabled = true;
  }

  public setValue(value: string): void {
    // Set the value of the input element
    this.input.value = value;
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

  public showHintRequiredFieldIsEmpty(): void {
    if (!this.input.value) {
      this.input.classList.add(Styles.INPUT_ERROR);
      this.errorHint.showErrorText(this.hintRequiredField);
    }
  }

  public showHintZipCode(code: string): void {
    const { input } = this;
    const inputValue: string = input.value;

    const errorText: string | null = this.validator(inputValue, code);

    if (errorText) {
      input.classList.add(Styles.INPUT_ERROR);
      this.errorHint.showErrorText(errorText);
    } else {
      input.classList.remove(Styles.INPUT_ERROR);
      this.errorHint.hideErrorText();
    }
  }

  public showHintNotFoundUser(): void {
    this.input.value = '';
    this.input.classList.add(Styles.INPUT_ERROR);
    this.errorHint.showErrorText(this.hintUserNotFound);
  }

  public setSelectComponent(select: SelectComponentProfile): void {
    this.selectComponent = select;
  }

  private addInputHadler(input: HTMLInputElement): void {
    input.addEventListener(Events.INPUT, (): void => {
      const inputValue: string = input.value;
      const codeCountry: string = this.selectComponent?.getCodeCountry() ?? '';
      const errorText: string | null = this.validator(inputValue, codeCountry);

      if (!codeCountry.length) {
        this.selectComponent?.showHintRequiredFieldIsEmpty();
      }

      if (errorText) {
        input.classList.add(Styles.INPUT_ERROR);
        this.errorHint.showErrorText(errorText);

        if (this.selectComponent) {
        }
      } else {
        input.classList.remove(Styles.INPUT_ERROR);
        this.errorHint.hideErrorText();

        if (this.selectComponent) {
        }
      }
    });
  }
}

export default InputPostal;
