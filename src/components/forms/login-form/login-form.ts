import BaseComponent from '../../base/base-component/base-component';
import InputBase from '../input-base/input-base';
import InputPassword from '../input-password/input-password';
import Button from '../button/button';
import { TagNames, Styles, Content, Events, FormFields, Attributes, TypeButton } from './enum';
import { emailOptions, passwordOptions } from './input-options';
import './login-form.scss';

// удалить после того как будет util: Validator
const validator = (data: string): string | null => {
  const randomNumber: number = Math.floor(Math.random() * 10);
  console.log(data);

  if (randomNumber <= 5) {
    return 'Not correct email address';
  }

  return null;
};

class LoginForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private inputMail: InputBase;

  private inputPassword: InputPassword;

  private buttonLogin: Button;

  constructor() {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.inputMail = new InputBase(validator, emailOptions);
    this.inputPassword = new InputPassword(validator, passwordOptions);
    this.buttonLogin = new Button(TypeButton.LOGIN);
  }

  public createComponent(): this {
    const { form, title, inputMail, inputPassword, buttonLogin } = this;
    const inputMailContainer: HTMLElement = inputMail.getElement();
    const inputPasswordContainer: HTMLElement = inputPassword.getElement();
    const buttonElement: HTMLElement = buttonLogin.getElement();

    form.setAttribute(Attributes.ID, Attributes.ID_VALUE_FORM);
    title.innerText = Content.TITLE;

    [title, inputMailContainer, inputPasswordContainer, buttonElement].forEach(
      (el: HTMLElement): void => form.append(el)
    );

    this.addSubmitHandler(buttonElement);

    return this;
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  /**По хорошему необходимо внешний обработчик который будет управлять
   * отправкой данных формы на сервер или показывать сообщение ошибки невалидных данных,
   * перенеправлять на main page
   * или показывать сообщения ошибки при отклонении от сервера.
   */
  private addSubmitHandler(buttonSubmit: HTMLElement): void {
    buttonSubmit.addEventListener(Events.CLICK, (e: Event) => {
      e.preventDefault();

      const isValidData: boolean = this.isValidData();
      const formData: FormData = new FormData(this.form);

      const email: FormDataEntryValue | null = formData.get(FormFields.EMAIL);
      const password: FormDataEntryValue | null = formData.get(FormFields.PASSWORD);

      if (email && password && isValidData) {
        console.log({ email, password }); // <= удалить после рефакторинга
      } else {
        console.log('Entry data or not-valid data'); // <= удалить после рефакторинга
      }
    });
  }

  private isValidData(): boolean {
    if (!this.inputMail.isValid() || !this.inputPassword.isValid()) {
      return false;
    }

    return true;
  }
}

export default LoginForm;
