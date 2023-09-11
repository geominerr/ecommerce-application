import BaseComponent from '../base/base-component/base-component';
import { Attributes, Styles, TagNames } from './enum';
import './filter.scss';

class Filter extends BaseComponent {
  private filterContainer: HTMLDivElement;

  private closeBtn: HTMLElement;

  private countryContainer: HTMLDivElement;

  private brandContainer: HTMLDivElement;

  private priceContainer: HTMLDivElement;

  private checkboxJapan: HTMLInputElement;

  private checkboxUSA: HTMLInputElement;

  private checkboxBritain: HTMLInputElement;

  private checkboxGermany: HTMLInputElement;

  private checkboxPioneer: HTMLInputElement;

  private checkboxYamaha: HTMLInputElement;

  private checkboxAudeze: HTMLInputElement;

  private checkboxMeze: HTMLInputElement;

  private checkboxKEF: HTMLInputElement;

  private minPriceLabel: HTMLLabelElement;

  private maxPriceLabel: HTMLLabelElement;

  private filterButton: HTMLButtonElement;

  constructor() {
    super();
    this.filterContainer = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.closeBtn = this.createElement(TagNames.DIV, Styles.CLOSE_BTN);
    this.filterButton = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.countryContainer = this.createElement(TagNames.DIV, Styles.COUNTRY_CONTAINER);
    this.brandContainer = this.createElement(TagNames.DIV, Styles.BRAND_CONTAINER);
    this.priceContainer = this.createElement(TagNames.DIV, Styles.PRICE_CONTAINER);

    // Чекбоксы для стран
    this.checkboxJapan = this.createCheckbox('Japan', 'Japan');
    this.checkboxUSA = this.createCheckbox('USA', 'USA');
    this.checkboxBritain = this.createCheckbox('Great Britain', 'Great Britain');
    this.checkboxGermany = this.createCheckbox('Germany', 'Germany');

    // Чекбоксы для брендов
    this.checkboxPioneer = this.createCheckbox('Pioneer', 'Pioneer');
    this.checkboxYamaha = this.createCheckbox('Yamaha', 'Yamaha');
    this.checkboxAudeze = this.createCheckbox('Audeze', 'Audeze');
    this.checkboxMeze = this.createCheckbox('Meze', 'Meze');
    this.checkboxKEF = this.createCheckbox('KEF', 'KEF');

    // Input для цен
    this.minPriceLabel = this.createInputLabel('minPrice', 'Min price:', 'number', '€');
    this.maxPriceLabel = this.createInputLabel('maxPrice', 'Max price:', 'number', '€');

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
      this.checkboxBritain.lastChild instanceof HTMLInputElement &&
      this.checkboxGermany.lastChild instanceof HTMLInputElement
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
      if (this.checkboxGermany.lastChild.checked) {
        selectedValues.push(this.checkboxGermany.lastChild.value);
      }
    }

    return selectedValues;
  }

  public getPriceValue(): string[] {
    const selectedValues: string[] = [];

    if (
      this.minPriceLabel.lastChild instanceof HTMLInputElement &&
      this.maxPriceLabel.lastChild instanceof HTMLInputElement
    ) {
      if (this.minPriceLabel.lastChild.value) {
        // selectedValues.push(this.minPriceLabel.lastChild.value);
        selectedValues[0] = this.minPriceLabel.lastChild.value;
      }
      if (this.maxPriceLabel.lastChild.value) {
        // selectedValues.push(this.maxPriceLabel.lastChild.value);
        selectedValues[1] = this.maxPriceLabel.lastChild.value;
      }
    }

    return selectedValues;
  }

  private createComponent(): void {
    // Здесь создается: контейнер для выбора страны, хедер для страны.
    const countryHeader = this.createElement(TagNames.P, Styles.FILTER_HEADER);
    countryHeader.innerText = 'Select country';
    this.filterContainer.append(countryHeader);
    this.closeBtn.id = 'close-btn-filter';
    this.filterContainer.append(this.closeBtn);
    this.filterButton.innerText = 'Apply filter';
    this.filterButton.id = 'filter-btn';
    this.filterContainer.append(this.countryContainer);

    this.countryContainer.append(this.checkboxJapan);
    this.countryContainer.append(this.checkboxUSA);
    this.countryContainer.append(this.checkboxBritain);
    this.countryContainer.append(this.checkboxGermany);

    // Здесь создается: контейнер для выбора бренда, хедер для бренда.
    const brandHeader = this.createElement(TagNames.P, Styles.FILTER_HEADER);
    brandHeader.innerText = 'Select brand';
    this.filterContainer.append(brandHeader);
    this.filterContainer.append(this.brandContainer);

    this.brandContainer.append(this.checkboxPioneer);
    this.brandContainer.append(this.checkboxYamaha);
    this.brandContainer.append(this.checkboxAudeze);
    this.brandContainer.append(this.checkboxMeze);
    this.brandContainer.append(this.checkboxKEF);

    // Здесь создается: контейнер выбора для цен, хедер для цен.
    const priceHeader = this.createElement(TagNames.P, Styles.FILTER_HEADER);
    priceHeader.innerText = 'Select price range';
    this.filterContainer.append(priceHeader);
    this.filterContainer.append(this.priceContainer);

    this.priceContainer.append(this.minPriceLabel);
    this.priceContainer.append(this.maxPriceLabel);

    this.filterContainer.append(this.filterButton);
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

  private createInputLabel(
    id: string,
    labelText: string,
    inputType: string,
    placeholderText: string
  ): HTMLLabelElement {
    const label: HTMLLabelElement = this.createElement(TagNames.LABEL, Styles.INPUT_LABEL);
    label.innerText = labelText;

    const input: HTMLInputElement = this.createElement(TagNames.INPUT, Styles.INPUT);
    input.id = id;
    input.type = inputType;
    input.placeholder = placeholderText;
    input.min = '0';
    input.max = '31744';

    input.addEventListener('input', () => {
      const inputValue = parseInt(input.value);
      const maxValue = parseInt(input.max);

      if (inputValue > maxValue) {
        input.value = input.max;
      }

      if (!inputValue) {
        input.value = input.min;
      }
    });
    label.appendChild(input);
    return label;
  }
}

export default Filter;
