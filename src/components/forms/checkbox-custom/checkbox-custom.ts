import BaseComponent from '../../base/base-component/base-component';
import { TagNames, Styles, Attributes } from './enum';
import './checkbox-custom.scss';

class CheckboxCustom extends BaseComponent {
  private label: HTMLLabelElement;

  private input: HTMLInputElement;

  private customCheckbox: HTMLSpanElement;

  constructor() {
    super();
    this.label = this.createElement(TagNames.LABEL, Styles.LABEL);
    this.input = this.createElement(TagNames.INPUT, Styles.CHECKBOX);
    this.customCheckbox = this.createElement(TagNames.SPAN, Styles.CHECKBOX_CUSTOM);
  }

  public createComponent(): this {
    const { label, input, customCheckbox } = this;

    input.setAttribute(Attributes.TYPE, Attributes.TYPE_VALUE_CHECKBOX);

    [input, customCheckbox].forEach((el: HTMLElement): void => label.append(el));

    return this;
  }

  public getElement(): HTMLElement {
    return this.label;
  }

  public getCheckboxElement(): HTMLInputElement {
    return this.input;
  }
}

export default CheckboxCustom;
