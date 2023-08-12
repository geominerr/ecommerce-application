import { APIUserActions } from '../../api/api-user-actions';
import BaseComponent from '../../components/base/base-component/base-component';
import RegistrationForm from '../../components/forms/registration-form/registration-form';
import { AddressCheck } from '../../utils/address_check';
import { EmailPasswordCheck } from '../../utils/email_password_check';
import { TagNames, Styles } from './enum';
import './registration-page.scss';

class RegistrationPage extends BaseComponent {
  private container: HTMLDivElement;

  private registrationForm: RegistrationForm;

  constructor(api: APIUserActions, validator1: EmailPasswordCheck, validator2: AddressCheck) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.registrationForm = new RegistrationForm(api, validator1, validator2);
  }

  public render(): void {
    const { container, registrationForm } = this;
    const registrationFormElement: HTMLElement = registrationForm.getElement();

    container.append(registrationFormElement);
    document.body.append(container);
  }
}

export default RegistrationPage;
