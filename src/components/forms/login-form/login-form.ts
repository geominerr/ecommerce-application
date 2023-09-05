import BaseComponent from '../../base/base-component/base-component';
import InputBase from '../input-base/input-base';
import InputPassword from '../input-password/input-password';
import Button from '../button/button';
import { popup } from '../../popup/popup';
import StateManager from '../../../state-manager/state-manager';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { emailOptions, passwordOptions } from './input-options';
import { TagNames, Styles, Content, Events, Attributes, TypeButton } from './enum';
import './login-form.scss';

class LoginForm extends BaseComponent {
  private form: HTMLFormElement;

  private title: HTMLHeadElement;

  private inputMail: InputBase;

  private inputPassword: InputPassword;

  private buttonLogin: Button;

  private signupContainer: HTMLDivElement;

  private titleHint: HTMLHeadElement;

  private buttonSignup: Button;

  private popup = popup;

  private api: APIUserActions;

  private router: Router | null = null;

  private stateManager: StateManager | null = null;

  private pathToMain: string = '/';

  private pathToRegistration: string = '/registration';

  constructor(apiUser: APIUserActions, validator: EmailPasswordCheck) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);
    this.title = this.createElement(TagNames.H3, Styles.TITLE);
    this.inputMail = new InputBase(validator.emailCheck, emailOptions);
    this.inputPassword = new InputPassword(validator, passwordOptions);
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

  public setRouter(router: Router): void {
    this.router = router;
  }

  public setStateManager(state: StateManager): void {
    this.stateManager = state;
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

      this.redirectToRegistration();
    });
  }

  private addSubmitHandler(buttonSubmit: HTMLElement): void {
    buttonSubmit.addEventListener(Events.CLICK, (e: Event) => {
      e.preventDefault();

      const isValidData: boolean = this.isValidData();

      const email: string = this.inputMail.getValue();
      const password: string = this.inputPassword.getValue();

      if (email && password && isValidData) {
        this.api
          .loginUserPassFlow(email, password)
          .then(() => {
            this.popup.showAuthorizationMessage();
            this.redirectToMain();
          })
          .catch(() =>
            [this.inputMail, this.inputPassword].forEach((input): void => {
              this.popup.showAuthorizationErrorMessage();
              input.showHintNotFoundUser();
            })
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

  private redirectToMain(): void {
    if (this.router && this.stateManager) {
      history.pushState(null, '', this.pathToMain);
      this.router.router().then(() => {
        this.stateManager?.changeAuthorizationStatus();
      });
    }
  }

  private redirectToRegistration(): void {
    if (this.router) {
      history.pushState(null, '', this.pathToRegistration);
      this.router.router();
    }
  }
}

export default LoginForm;
