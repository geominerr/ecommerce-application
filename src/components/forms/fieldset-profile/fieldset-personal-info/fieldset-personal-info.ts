import BaseComponent from '../../../base/base-component/base-component';
import InputBase from '../../input-profile/input-base/input-base';
import { AddressCheck } from '../../../../utils/address_check';
import { EmailPasswordCheck } from '../../../../utils/email_password_check';
import { TagNames, Styles, Contents } from './enum';
import { OPTIONS } from './input-options';
import { APIUserActions } from '../../../../api/api-user-actions';
import './fieldset.scss';

class FieldsetPersonal extends BaseComponent {
  private fieldsetElement: HTMLFieldSetElement;

  private legendElement: HTMLLegendElement;

  private inputMail: InputBase;

  private inputFirstName: InputBase;

  private inputLastName: InputBase;

  private inputDateBirth: InputBase;

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  private allInputs: InputBase[] = [];

  constructor(validatorPass: EmailPasswordCheck, validatorAdrress: AddressCheck) {
    super();

    this.fieldsetElement = this.createElement(TagNames.FIELDSET, Styles.FIELDSET);
    this.legendElement = this.createElement(TagNames.LEGEND, Styles.LEGEND);
    this.inputMail = new InputBase(validatorPass.emailCheck, OPTIONS[0]);
    this.inputFirstName = new InputBase(validatorAdrress.firstNameCheck, OPTIONS[1]);
    this.inputLastName = new InputBase(validatorAdrress.lastNameCheck, OPTIONS[2]);
    this.inputDateBirth = new InputBase(validatorAdrress.ageCheck, OPTIONS[3]);

    this.createComponent();
    this.getUserData();
  }

  public async getUserData(): Promise<void> {
    try {
      const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
      const profileLink = navLinks.find((link) => link.getAttribute('href') === '/profile');
      [this.inputFirstName, this.inputLastName, this.inputMail, this.inputDateBirth].forEach(
        (input) => input.inputDisable()
      );

      const fetchUserData = async (): Promise<void> => {
        if (localStorage.getItem(this.keyAccessToken)) {
          const api = new APIUserActions();
          const { firstName, lastName, email, dateOfBirth } = await api.getCustomer();
          this.setInputValues(firstName, lastName, email, dateOfBirth);
        }
      };

      if (profileLink) {
        profileLink.addEventListener('click', async (event) => {
          event.preventDefault();
          await fetchUserData();
        });
      }

      await fetchUserData();
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
    }
  }

  public getElement(): HTMLElement {
    return this.fieldsetElement;
  }

  public showHintUserExist(): void {
    this.inputMail.showHintUserExist();
  }

  public getData(): string[] {
    const { inputMail, inputFirstName, inputLastName, inputDateBirth } = this;

    const result: string[] = [];

    [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input): number =>
      result.push(input.getValue())
    );

    return result;
  }

  public isValidData(): boolean {
    const { inputMail, inputFirstName, inputLastName, inputDateBirth } = this;

    const isValid: boolean = [inputMail, inputFirstName, inputLastName, inputDateBirth].every(
      (input): boolean => input.isValid()
    );

    if (!isValid) {
      [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input): void =>
        input.showHintRequiredFieldIsEmpty()
      );
    }

    return isValid;
  }

  private createComponent(): void {
    const {
      fieldsetElement,
      legendElement,
      inputMail,
      inputFirstName,
      inputLastName,
      inputDateBirth,
      allInputs,
    } = this;

    legendElement.innerText = Contents.LEGEND;
    fieldsetElement.append(legendElement);

    [inputMail, inputFirstName, inputLastName, inputDateBirth].forEach((input: InputBase): void => {
      allInputs.push(input);
      fieldsetElement.append(input.getElement());
    });
  }

  private setInputValues(
    firstName: string,
    lastName: string,
    email: string,
    dateOfBirth: string
  ): void {
    this.inputMail.setValue(email);
    this.inputFirstName.setValue(firstName);
    this.inputLastName.setValue(lastName);
    this.inputDateBirth.setValue(dateOfBirth);
  }
}

export default FieldsetPersonal;
