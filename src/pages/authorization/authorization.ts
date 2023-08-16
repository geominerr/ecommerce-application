import LoginForm from '../../components/forms/login-form/login-form';
import TemplateView from '../template-view/template-view';
import { APIUserActions } from '../../api/api-user-actions';
import { EmailPasswordCheck } from '../../utils/email_password_check';
import { TagNames, Styles } from './enum';
import './authorization.scss';

class Authorization extends TemplateView {
  private container: HTMLDivElement;

  private loginForm: LoginForm;

  private documentTitle: string = 'Authorization';

  constructor(api: APIUserActions, validator: EmailPasswordCheck) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.loginForm = new LoginForm(api, validator);

    this.createComponent();
  }

  public async getHtml(): Promise<string | HTMLElement> {
    return this.container;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }

  private createComponent(): void {
    const { container, loginForm } = this;
    const loginFormElement: HTMLElement = loginForm.getElement();

    container.append(loginFormElement);
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}

export default Authorization;
