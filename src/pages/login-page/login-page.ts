import { APIUserActions } from '../../api/api-user-actions';
import BaseComponent from '../../components/base/base-component/base-component';
import LoginForm from '../../components/forms/login-form/login-form';
import { TagNames, Styles } from './enum';
import './login-page.scss';

class LoginPage extends BaseComponent {
  private container: HTMLDivElement;

  private loginForm: LoginForm;

  constructor(api: APIUserActions) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.loginForm = new LoginForm(api);
  }

  public render(): void {
    const { container, loginForm } = this;
    const loginFormElement: HTMLElement = loginForm.getElement();

    container.append(loginFormElement);
    document.body.append(container);
  }
}

export default LoginPage;
