import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import InputPostal from '../input-postal/input-postal';
import { Address, Attributes, Events, Styles, TagNames } from './enum';
import { AddresType } from './select-interfaces';
import { COUNTRIES, BILLING_OPTIONS, SHIPPING_OPTIONS } from './select-options';
import './select.scss';

class SelectComponent extends BaseComponent {
  private container: HTMLDivElement;

  private select: HTMLSelectElement;

  private input: InputPostal | null = null;

  private defaultCountryIndex: number = 6;

  constructor(type: AddresType) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.select = this.createElement(TagNames.SELECT, Styles.SELECT);
    this.createComponent(type);

    this.setDefaultCountry();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public getCodeCountry(): string {
    return this.select.options[this.select.selectedIndex].value;
  }

  public setInputPostal(input: InputPostal): void {
    this.input = input;
  }

  private createComponent(type: AddresType): void {
    const { container, select } = this;
    const label: HTMLLabelElement = this.createElement(TagNames.LABEL, Styles.LABEL);

    select.setAttribute(Attributes.ID, SHIPPING_OPTIONS.ID);
    select.setAttribute(Attributes.NAME, SHIPPING_OPTIONS.NAME);
    label.setAttribute(Attributes.FOR, SHIPPING_OPTIONS.ID);
    label.innerText = SHIPPING_OPTIONS.LABEL_CONTENT;

    if (type !== Address.SHIPPING) {
      select.setAttribute(Attributes.ID, BILLING_OPTIONS.ID);
      select.setAttribute(Attributes.NAME, BILLING_OPTIONS.NAME);
      label.setAttribute(Attributes.FOR, BILLING_OPTIONS.ID);
      label.innerText = BILLING_OPTIONS.LABEL_CONTENT;
    }

    for (const country in COUNTRIES) {
      const option: HTMLOptionElement = this.createElement(TagNames.OPTION, Styles.OPTION);

      option.setAttribute(Attributes.VALUE, COUNTRIES[country]);
      option.innerText = country;

      select.append(option);
    }

    this.addChangeHandler(select);

    [label, select].forEach((el: HTMLElement): void => container.append(el));
  }

  private setDefaultCountry(): void {
    this.select.selectedIndex = this.defaultCountryIndex;
  }

  private addChangeHandler(select: HTMLSelectElement): void {
    select.addEventListener(Events.CHANGE, (): void => {
      if (this.input) {
        const codeCountry: string = this.getCodeCountry();
        this.input.showHintZipCode(codeCountry);
      }
    });
  }
}

export default SelectComponent;
