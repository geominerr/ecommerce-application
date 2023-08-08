import BaseComponent from '../../base/base-component/base-component';
import InputMail from '../input-mail/input-mail';
import InputPassword from '../input-password/input-password';
import Button from '../button/button';
import { TagNames, Styles, Content, TypeButton } from './enum';
import './login-form.scss';

const validator = (data: string): string | false => {
  const randomNumber: number = Math.floor(Math.random() * 10);
  console.log(data);

  if (randomNumber <= 5) {
    return 'Not correct email address';
  }

  return false;
};

class LoginForm extends BaseComponent {
  private container: HTMLDivElement;

  private title: HTMLHeadElement;

  private inputMail: InputMail;

  private inputPassword: InputPassword;

  private buttonLogin: Button;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.inputMail = new InputMail(validator).createComponent();
    this.inputPassword = new InputPassword(validator).createComponent();
    this.buttonLogin = new Button(TypeButton.LOGIN);
  }

  public createComponent(): this {
    const { container, title, inputMail, inputPassword, buttonLogin } = this;
    const inputMailElement: HTMLElement = inputMail.getElement();
    const inputPasswordElemenet: HTMLElement = inputPassword.getElement();
    const buttonElement: HTMLElement = buttonLogin.getElement();

    title.innerText = Content.TITLE;

    [title, inputMailElement, inputPasswordElemenet, buttonElement].forEach(
      (el: HTMLElement): void => container.append(el)
    );

    return this;
  }

  public getElement(): HTMLElement {
    return this.container;
  }
}

export default LoginForm;
