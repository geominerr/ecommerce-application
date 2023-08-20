import { APIUserActions } from '../../api/api-user-actions';
import TemplateView from '../template-view/template-view';
import RegistrationForm from '../../components/forms/registration-form/registration-form';
import { Router } from '../../router/router';
import { AddressCheck } from '../../utils/address_check';
import { EmailPasswordCheck } from '../../utils/email_password_check';
import { TagNames, Styles } from './enum';
import './registration.scss';
import StateManager from '../../state-manager/state-manager';

class Registration extends TemplateView {
  private container: HTMLDivElement;

  private registrationForm: RegistrationForm;

  private documentTitle: string = 'Registration';

  constructor(api: APIUserActions, validator1: EmailPasswordCheck, validator2: AddressCheck) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.registrationForm = new RegistrationForm(api, validator1, validator2);

    this.createComponent();
  }

  public async getHtml(): Promise<string | HTMLElement> {
    return this.container;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }

  public setRouter(router: Router): this {
    this.registrationForm.setRouter(router);

    return this;
  }

  public setStateManager(state: StateManager): this {
    this.registrationForm.setStateManager(state);

    return this;
  }

  private createComponent(): void {
    const { container, registrationForm } = this;
    const registrationFormElement: HTMLElement = registrationForm.getElement();

    container.append(registrationFormElement);
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }
}

export default Registration;
