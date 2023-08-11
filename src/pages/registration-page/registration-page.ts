import BaseComponent from '../../components/base/base-component/base-component';
import RegistrationForm from '../../components/forms/registration-form/registration-form';
import { TagNames, Styles } from './enum';
import './registration-page.scss';

class RegistrationPage extends BaseComponent {
  private container: HTMLDivElement;

  private registrationForm: RegistrationForm;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
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
