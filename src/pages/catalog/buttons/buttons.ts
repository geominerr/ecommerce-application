import BaseComponent from '../../../components/base/base-component/base-component';
import ButtonPage from './button/button';
import { Styles, TagNames } from './enum';
import './buttons.scss';

class Buttons extends BaseComponent {
  private container: HTMLElement;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.BUTTONS_CONTAINER);
    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private createComponent(): void {
    const { container } = this;

    const btnCatalog = new ButtonPage('catalog').getElement();
    const btnFilter = new ButtonPage('filter').getElement();

    [btnCatalog, btnFilter].forEach((el) => container.append(el));
  }
}

export default Buttons;
