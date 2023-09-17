import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles } from './enum';
import './search.scss';

class InputSearch extends BaseComponent {
  private container: HTMLElement;

  private hint: HTMLElement;

  private input: HTMLInputElement;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.SEARCH_CONTAINER);
    this.hint = this.createElement(TagNames.DIV, Styles.HINT);
    this.input = this.createElement<HTMLInputElement>(TagNames.INPUT, Styles.INPUT);

    this.createComponent();
  }

  private createComponent(): void {
    const { container, input } = this;

    input.placeholder = 'Search';
    container.append(input);
    // container.append(this.hint);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public getValue(): string {
    // this.showHint(this.input.value);

    return this.input.value;
  }

  private showHint(value: string): void {
    this.hint.innerText = `Results: ${value}`;
  }
}

export default InputSearch;
