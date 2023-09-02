import BaseComponent from '../../../../components/base/base-component/base-component';
import { TypeButton } from './button-interfaces';
import { TagNames, Styles } from './enum';
import './button.scss';

class ButtonPage extends BaseComponent {
  private button: HTMLButtonElement;

  constructor(type: TypeButton) {
    super();
    this.button = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.createComponent(type);
  }

  public getElement(): HTMLButtonElement {
    return this.button;
  }

  private createComponent(type: TypeButton): void {
    const { button } = this;

    if (type === 'filter') {
      button.classList.add(Styles.BTN_FILTER);
    }

    button.id = type;
    button.innerText = type[0].toUpperCase() + type.slice(1);
  }
}

export default ButtonPage;
