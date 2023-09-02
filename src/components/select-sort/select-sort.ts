import BaseComponent from '../base/base-component/base-component';
import { Attributes, Events, Styles, TagNames } from './enum';
import { SORT_OPTIONS } from './select-options';
import './select-sort.scss';

class SelectSort extends BaseComponent {
  private select: HTMLSelectElement;

  private disabledOptionText: string = 'Sort type';

  constructor() {
    super();
    this.select = this.createElement(TagNames.SELECT, Styles.SELECT);
    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.select;
  }

  public getValue(): string[] {
    return this.select.options[this.select.selectedIndex].value.split('-');
  }

  private createComponent(): void {
    const { select, disabledOptionText } = this;
    const disabledOption: HTMLOptionElement = this.createElement(TagNames.OPTION, Styles.OPTION);

    disabledOption.disabled = true;
    disabledOption.selected = true;
    disabledOption.hidden = true;
    disabledOption.innerText = disabledOptionText;

    select.append(disabledOption);

    for (const key in SORT_OPTIONS) {
      const option: HTMLOptionElement = this.createElement(TagNames.OPTION, Styles.OPTION);

      option.setAttribute(Attributes.VALUE, key);
      option.innerText = SORT_OPTIONS[key];

      select.append(option);
    }

    this.addChangeHandler(select);
  }

  private addChangeHandler(select: HTMLSelectElement): void {
    select.addEventListener(Events.CHANGE, (): void => {
      // to do
    });
  }
}

export default SelectSort;
