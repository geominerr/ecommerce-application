import BaseComponent from '../../base/base-component/base-component';
import { Attributes, Styles, TagNames } from './enum';
import './filter.scss';

class Filter extends BaseComponent {
  private filterContainer: HTMLDivElement;

  private countryContainer: HTMLDivElement;

  private brandContainer: HTMLDivElement;

  private checkboxJapan: HTMLInputElement;

  private checkboxUSA: HTMLInputElement;

  private checkboxBritain: HTMLInputElement;

  private checkboxPioneer: HTMLInputElement;

  private checkboxYamaha: HTMLInputElement;

  private checkboxAudeze: HTMLInputElement;

  private checkboxMeze: HTMLInputElement;

  private checkboxKEF: HTMLInputElement;

  private filterButton: HTMLButtonElement;

  constructor() {
    super();
    this.filterContainer = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.filterButton = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.countryContainer = this.createElement(TagNames.DIV, Styles.COUNTRY_CONTAINER);
    this.brandContainer = this.createElement(TagNames.DIV, Styles.BRAND_CONTAINER);

    // Чекбоксы для стран
    this.checkboxJapan = this.createCheckbox('Japan', 'Japan');
    this.checkboxUSA = this.createCheckbox('USA', 'USA');
    this.checkboxBritain = this.createCheckbox('Great Britain', 'Great Britain');

    // Чекбоксы для брендов
    this.checkboxPioneer = this.createCheckbox('Pioneer', 'Pioneer');
    this.checkboxYamaha = this.createCheckbox('Yamaha', 'Yamaha');
    this.checkboxAudeze = this.createCheckbox('Audeze', 'Audeze');
    this.checkboxMeze = this.createCheckbox('Meze', 'Meze');
    this.checkboxKEF = this.createCheckbox('KEF', 'KEF');
    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.filterContainer;
  }

  public getBrandValue(): string[] {
    const selectedValues: string[] = [];

    if (
      this.checkboxPioneer.lastChild instanceof HTMLInputElement &&
      this.checkboxYamaha.lastChild instanceof HTMLInputElement &&
      this.checkboxAudeze.lastChild instanceof HTMLInputElement &&
      this.checkboxMeze.lastChild instanceof HTMLInputElement &&
      this.checkboxKEF.lastChild instanceof HTMLInputElement
    ) {
      if (this.checkboxPioneer.lastChild.checked) {
        selectedValues.push(this.checkboxPioneer.lastChild.value);
      }
      if (this.checkboxYamaha.lastChild.checked) {
        selectedValues.push(this.checkboxYamaha.lastChild.value);
      }
      if (this.checkboxAudeze.lastChild.checked) {
        selectedValues.push(this.checkboxAudeze.lastChild.value);
      }
      if (this.checkboxMeze.lastChild.checked) {
        selectedValues.push(this.checkboxMeze.lastChild.value);
      }
      if (this.checkboxKEF.lastChild.checked) {
        selectedValues.push(this.checkboxKEF.lastChild.value);
      }
    }

    return selectedValues;
  }

  public getCountryValue(): string[] {
    const selectedValues: string[] = [];

    if (
      this.checkboxJapan.lastChild instanceof HTMLInputElement &&
      this.checkboxUSA.lastChild instanceof HTMLInputElement &&
      this.checkboxBritain.lastChild instanceof HTMLInputElement
    ) {
      if (this.checkboxJapan.lastChild.checked) {
        selectedValues.push(this.checkboxJapan.lastChild.value);
      }
      if (this.checkboxUSA.lastChild.checked) {
        selectedValues.push(this.checkboxUSA.lastChild.value);
      }
      if (this.checkboxBritain.lastChild.checked) {
        selectedValues.push(this.checkboxBritain.lastChild.value);
      }
    }

    return selectedValues;
  }

  private createComponent(): void {
    // Здась создается: контейнер для выбора страны, хедер для страны.
    const countryHeader = this.createElement(TagNames.P, Styles.FILTER_HEADER);
    countryHeader.innerText = 'Select country';
    this.filterContainer.append(countryHeader);
    this.filterButton.innerText = 'Apply filter';
    this.filterContainer.append(this.countryContainer);

    this.countryContainer.append(this.checkboxJapan);
    this.countryContainer.append(this.checkboxUSA);
    this.countryContainer.append(this.checkboxBritain);

    // Здась создается: контейнер для выбора бренда, хедер для бренда.
    const brandHeader = this.createElement(TagNames.P, Styles.FILTER_HEADER);
    brandHeader.innerText = 'Select brand';
    this.filterContainer.append(brandHeader);
    this.filterContainer.append(this.brandContainer);

    this.brandContainer.append(this.checkboxPioneer);
    this.brandContainer.append(this.checkboxYamaha);
    this.brandContainer.append(this.checkboxAudeze);
    this.brandContainer.append(this.checkboxMeze);
    this.brandContainer.append(this.checkboxKEF);

    this.filterContainer.append(this.filterButton); // перенести в конец
  }

  private createCheckbox(labelText: string, value: string): HTMLInputElement {
    const checkbox: HTMLInputElement = this.createElement(TagNames.INPUT, Styles.CHECKBOX);
    checkbox.setAttribute(Attributes.TYPE, 'checkbox');
    checkbox.name = labelText;
    checkbox.value = value;
    const label = this.createElement(TagNames.LABEL, Styles.CHECKBOX_LABEL);
    label.innerText = labelText;
    label.appendChild(checkbox);
    return label as HTMLInputElement;
  }
}

export default Filter;
