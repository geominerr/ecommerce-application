import BaseComponent from '../../components/base/base-component/base-component';
import RegistrationForm from '../../components/forms/registration-form/registration-form';
import './registration-page.scss';

class RegistrationPage extends BaseComponent {
  private container: HTMLDivElement;

  private registrationForm: RegistrationForm;

  constructor() {
    super();
    this.container = this.createElement('div', 'container');
    this.registrationForm = new RegistrationForm();
  }

  public render(): void {
    const { container, registrationForm } = this;
    const registrationFormElement: HTMLElement = registrationForm.getElement();

    container.append(registrationFormElement);
    document.body.append(container);
  }
}

export default RegistrationPage;
