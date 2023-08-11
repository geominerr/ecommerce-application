import BaseComponent from '../../base/base-component/base-component';
import InputBase from '../input-base/input-base';
import InputPassword from '../input-password/input-password';
import Button from '../button/button';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { ValidationFunction } from '../../../types/general/general';
import { emailOptions, passwordOptions } from './input-options';
import { TagNames, Styles, Content, Events, Attributes, TypeButton } from './enum';
import './login-form.scss';

const validatorEmail: ValidationFunction = new EmailPasswordCheck().emailCheck;

class LoginForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private inputMail: InputBase;

  private inputPassword: InputPassword;

  private buttonLogin: Button;

  private signupContainer: HTMLDivElement;

  private titleHint: HTMLHeadElement;

  private buttonSignup: Button;

  private api: APIUserActions;

  constructor(apiUser: APIUserActions) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.inputMail = new InputBase(validatorEmail, emailOptions);
    this.inputPassword = new InputPassword(passwordOptions);
    this.buttonLogin = new Button(TypeButton.LOGIN);
    this.signupContainer = this.createElement(TagNames.DIV, Styles.SUBMIT_WRAPPER);
    this.titleHint = this.createElement(TagNames.H5, Styles.TITLE_HINT);
    this.buttonSignup = new Button(TypeButton.SIGN_UP);
    this.api = apiUser;

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  private createComponent(): void {
    const {
      form,
      title,
      inputMail,
      inputPassword,
      buttonLogin,
      titleHint,
      signupContainer,
      buttonSignup,
    } = this;
    const inputMailContainer: HTMLElement = inputMail.getElement();
    const inputPasswordContainer: HTMLElement = inputPassword.getElement();
    const buttonElement: HTMLElement = buttonLogin.getElement();
    const buttonSignupElement: HTMLElement = buttonSignup.getElement();

    form.setAttribute(Attributes.ID, Attributes.ID_VALUE_FORM);
    title.innerText = Content.TITLE;
    titleHint.innerText = Content.TITLE_HINT;

    [titleHint, buttonSignupElement].forEach((el: HTMLElement): void => signupContainer.append(el));

    [title, inputMailContainer, inputPasswordContainer, buttonElement, signupContainer].forEach(
      (el: HTMLElement): void => form.append(el)
    );

    this.addSubmitHandler(buttonElement);
    this.addClickHandler(buttonSignupElement);
  }

  private addClickHandler(buttonSignup: HTMLElement): void {
    buttonSignup.addEventListener(Events.CLICK, (e: Event) => {
      e.preventDefault();

      console.log('go to registration page');
    });
  }

  private addSubmitHandler(buttonSubmit: HTMLElement): void {
    buttonSubmit.addEventListener(Events.CLICK, (e: Event) => {
      e.preventDefault();

      const isValidData: boolean = this.isValidData();

      const email: string = this.inputMail.getValue();
      const password: string = this.inputPassword.getValue();

      if (email && password && isValidData) {
        console.log({ email, password }); // <= удалить после рефакторинга
        this.api
          .loginUser(email, password)
          .then((data) => console.log('redirect to main page', data))
          .catch(() =>
            [this.inputMail, this.inputPassword].forEach((input): void =>
              input.showHintNotFoundUser()
            )
          );
      } else {
        this.inputMail.showHintRequiredFieldIsEmpty();
        this.inputPassword.showHintRequiredFieldIsEmpty();
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
