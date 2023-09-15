import BaseComponent from '../../base/base-component/base-component';
import ErrorHint from '../error-hint/error-hint';
import { Attributes, Events, Styles, TagNames } from './enum';
import { COUNTRIES, TYPE } from './select-options';
import './select.scss';

class SelectComponentType extends BaseComponent {
  private container: HTMLDivElement;

  private select: HTMLSelectElement;

  private errorHint: ErrorHint;

  private disabledOptionText: string = 'Select type';

  private disableOptionIndex: number = 0;

  private static id: number = 0;

  private hintRequiredField: string = 'This is a required field';

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.select = this.createElement(TagNames.SELECT, Styles.SELECT);
    this.errorHint = new ErrorHint();
    this.createComponent();
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

  public clearValue(): void {
    this.select.selectedIndex = this.disableOptionIndex;
  }

  public getValue(): string {
    return this.select.options[this.select.selectedIndex].value;
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
  private createComponent(): void {
    const { container, select, disabledOptionText } = this;
    const label: HTMLLabelElement = this.createElement(TagNames.LABEL, Styles.LABEL);
    const disabledOption: HTMLOptionElement = this.createElement(TagNames.OPTION, Styles.OPTION);
    const errorHintElement: HTMLElement = this.errorHint.getElement();
    const inputId = `select-type-${SelectComponentType.id++}`;

    disabledOption.disabled = true;
    disabledOption.selected = true;
    disabledOption.hidden = true;
    disabledOption.innerText = disabledOptionText;

    select.setAttribute(Attributes.ID, inputId);
    select.setAttribute(Attributes.NAME, TYPE.NAME);
    label.setAttribute(Attributes.FOR, inputId);
    label.innerText = TYPE.LABEL_CONTENT;

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
      if (select.selectedIndex !== this.disableOptionIndex) {
        select.classList.remove(Styles.SELECT_ERROR);
        this.errorHint.hideErrorText();
      }
    });
  }
}

export default SelectComponentType;
