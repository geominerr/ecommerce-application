import BaseComponent from '../../base/base-component/base-component';
import { TagNames, Styles, Attributes, Content } from './enum';
import { TypeButton } from './button-interfaces';
import './button.scss';

class Button extends BaseComponent {
  private button: HTMLButtonElement;

  private typeButton: TypeButton;

  constructor(type: TypeButton) {
    super();
    this.button = this.createElement(TagNames.BUTTON, Styles.BUTTON);
    this.typeButton = type;
  }

  public getElement(): HTMLButtonElement {
    const { button, typeButton } = this;

    button.setAttribute(Attributes.TYPE, Attributes.TYPE_VALUE_SUBMIT);
    button.innerText = Content.LOGIN;

    if (typeButton !== 'login') {
      button.innerText = Content.REGISTRATION;
    }

    return button;
  }
}

export default Button;
