import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import { TagNames, Styles, Attributes } from './enum';
import './checkbox.scss';

class CheckboxComponent extends BaseComponent {
  private container: HTMLDivElement;

  private inputWrapper: HTMLDivElement;

  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private hint: ErrorHint;

  constructor(contentLabel: string, id: string) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.inputWrapper = this.createElement(TagNames.DIV, Styles.INPUT_CONTAINER);
    this.label = this.createElement(TagNames.LABEL, Styles.LABEL);
    this.input = this.createElement(TagNames.INPUT, Styles.CHECKBOX);
    this.hint = new ErrorHint();

    this.createComponent(contentLabel, id);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public getCheckboxElement(): HTMLInputElement {
    return this.input;
  }

  public showHintDefaultAddress(text: string): void {
    this.hint.showAddressWarning(text);
  }

  public hideHintDefaultAddress(): void {
    this.hint.hideAddressWarning();
  }

  public setChecked(checked: boolean): void {
    this.input.checked = checked;
  }

  private createComponent(contentLabel: string, id: string): void {
    const { container, inputWrapper, label, input, hint } = this;
    const hintElement: HTMLElement = hint.getElement();

    // input.setAttribute(Attributes.ID, id);
    input.setAttribute(Attributes.TYPE, Attributes.TYPE_VALUE_CHECKBOX);
    label.setAttribute(Attributes.FOR, id);
    label.innerText = contentLabel;

    [input, label].forEach((el: HTMLElement): void => inputWrapper.append(el));
    [inputWrapper, hintElement].forEach((el: HTMLElement): void => container.append(el));
  }
}

export default CheckboxComponent;
