import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import InputPostal from '../input-profile/input-postal/input-postal';
import { Address, Attributes, Events, Styles, TagNames } from './enum';
import { AddresType } from './select-interfaces';
import { COUNTRIES, BILLING_OPTIONS, SHIPPING_OPTIONS, NEW_ADDRESS } from './select-options';
import './select.scss';

class SelectComponentProfile extends BaseComponent {
  private container: HTMLDivElement;

  private select: HTMLSelectElement;

  private errorHint: ErrorHint;

  private input: InputPostal | null = null;

  private disabledOptionText: string = 'Select country';

  private disableOptionIndex: number = 0;

  private hintRequiredField: string = 'This is a required field';

  constructor(type: AddresType) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.select = this.createElement(TagNames.SELECT, Styles.SELECT);
    this.errorHint = new ErrorHint();
    this.createComponent(type);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public getCodeCountry(): string {
    if (this.select.selectedIndex === this.disableOptionIndex) {
      return '';
    }

    return this.select.options[this.select.selectedIndex].value;
  }

  public setValue(value: string): void {
    // Set the value of the input element
    this.select.value = value;
  }

  public inputDisable(): void {
    // Set the value of the input element
    this.select.disabled = true;
  }

  public inputEnable(): void {
    // Set the value of the input element
    this.select.disabled = false;
  }

  public getValue(): string {
    return this.select.options[this.select.selectedIndex].value;
  }

  public setInputPostal(input: InputPostal): void {
    this.input = input;
  }

  public isValid(): boolean {
    return this.select.selectedIndex !== this.disableOptionIndex;
  }

  public showHintRequiredFieldIsEmpty(): void {
    if (this.select.selectedIndex === 0) {
      this.select.classList.add(Styles.SELECT_ERROR);
      this.errorHint.showErrorText(this.hintRequiredField);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  private createComponent(type: AddresType): void {
    const { container, select, disabledOptionText } = this;
    const label: HTMLLabelElement = this.createElement(TagNames.LABEL, Styles.LABEL);
    const disabledOption: HTMLOptionElement = this.createElement(TagNames.OPTION, Styles.OPTION);
    const errorHintElement: HTMLElement = this.errorHint.getElement();

    disabledOption.disabled = true;
    disabledOption.selected = true;
    disabledOption.hidden = true;
    disabledOption.innerText = disabledOptionText;

    select.setAttribute(Attributes.NAME, SHIPPING_OPTIONS.NAME);
    label.setAttribute(Attributes.FOR, SHIPPING_OPTIONS.ID);
    label.innerText = SHIPPING_OPTIONS.LABEL_CONTENT;

    if (type !== Address.SHIPPING) {
      select.setAttribute(Attributes.NAME, BILLING_OPTIONS.NAME);
      label.setAttribute(Attributes.FOR, BILLING_OPTIONS.ID);
      label.innerText = BILLING_OPTIONS.LABEL_CONTENT;
    }
    if (type !== Address.SHIPPING && type !== Address.BILLING) {
      select.setAttribute(Attributes.NAME, NEW_ADDRESS.NAME);
      label.setAttribute(Attributes.FOR, NEW_ADDRESS.ID);
      label.innerText = NEW_ADDRESS.LABEL_CONTENT;
    }

    select.append(disabledOption);

    for (const country in COUNTRIES) {
      const option: HTMLOptionElement = this.createElement(TagNames.OPTION, Styles.OPTION);

      option.setAttribute(Attributes.VALUE, COUNTRIES[country]);
      option.innerText = country;

      select.append(option);
    }

    this.addChangeHandler(select);

    [label, select, errorHintElement].forEach((el: HTMLElement): void => container.append(el));
  }

  private addChangeHandler(select: HTMLSelectElement): void {
    select.addEventListener(Events.CHANGE, (): void => {
      if (this.input) {
        const codeCountry: string = this.getCodeCountry();
        this.input.showHintZipCode(codeCountry);
      }

      if (select.selectedIndex !== this.disableOptionIndex) {
        select.classList.remove(Styles.SELECT_ERROR);
        this.errorHint.hideErrorText();
      }
    });
  }
}

export default SelectComponentProfile;
