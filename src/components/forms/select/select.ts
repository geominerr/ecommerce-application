import BaseComponent from '../../base/base-component/base-component';
import { Address, Attributes, Styles, TagNames } from './enum';
import { AddresType } from './select-interfaces';
import { COUNTRIES, BILLING_OPTIONS, SHIPPING_OPTIONS } from './select-options';
import './select.scss';

class SelectComponent extends BaseComponent {
  private container: HTMLDivElement;

  private select: HTMLSelectElement;

  constructor(type: AddresType) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.select = this.createElement(TagNames.SELECT, Styles.SELECT);
    this.createComponent(type);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public getValueCountry(): string {
    return this.select.value;
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

    [label, select].forEach((el: HTMLElement): void => container.append(el));
  }
}

export default SelectComponent;
