import BaseComponent from '../../base/base-component/base-component';
import { Attributes, Styles, TagNames } from './enum';
import './filter.scss';

class Filter extends BaseComponent {
  private filterContainer: HTMLDivElement;

  private countryContainer: HTMLDivElement;

  private checkboxJapan: HTMLInputElement;

  private checkboxUSA: HTMLInputElement;

  private checkboxBritain: HTMLInputElement;

  private filterButton: HTMLButtonElement;

  constructor() {
    super();
    this.filterContainer = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.filterButton = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.countryContainer = this.createElement(TagNames.DIV, Styles.COUNTRY_CONTAINER);

    this.checkboxJapan = this.createCheckbox('Japan', 'Japan');
    this.checkboxUSA = this.createCheckbox('USA', 'USA');
    this.checkboxBritain = this.createCheckbox('Great Britain', 'GB');
    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.filterContainer;
  }

  public getValue(): string[] {
    const selectedValues: string[] = [];
    if (this.checkboxJapan.checked) {
      selectedValues.push(this.checkboxJapan.value);
    }
    if (this.checkboxUSA.checked) {
      selectedValues.push(this.checkboxUSA.value);
    }
    if (this.checkboxBritain.checked) {
      selectedValues.push(this.checkboxBritain.value);
    }
    return selectedValues;
  }

  private createComponent(): void {
    this.filterContainer.append(this.countryContainer);
    const countryHeader = this.createElement(TagNames.P, Styles.FILTER_HEADER);
    countryHeader.innerText = 'Select country';
    this.filterContainer.append(countryHeader);
    this.filterButton.innerText = 'Apply filter';
    this.filterContainer.append(this.filterButton);

    this.countryContainer.append(this.checkboxJapan);
    this.countryContainer.append(this.checkboxUSA);
    this.countryContainer.append(this.checkboxBritain);
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
