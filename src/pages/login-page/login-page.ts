import LoginForm from '../../components/forms/login-form/login-form';
import './login-page.scss';

class LoginPage {
  private container: HTMLDivElement;

  private loginForm: LoginForm;

  constructor() {
    this.container = this.createElement('div', 'container');
    this.loginForm = new LoginForm().createComponent();
  }

  public render(): void {
    const { container, loginForm } = this;
    const loginFormElement: HTMLElement = loginForm.getElement();

    container.append(loginFormElement);
    document.body.append(container);
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}

export default LoginPage;
