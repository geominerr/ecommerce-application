import BaseComponent from '../../base/base-component/base-component';
import FieldsetPersonal from '../fieldset-profile/fieldset-personal-info/fieldset-personal-info';
import { Router } from '../../../router/router';
import { APIUserActions } from '../../../api/api-user-actions';
import { EmailPasswordCheck } from '../../../utils/email_password_check';
import { AddressCheck } from '../../../utils/address_check';
import { TagNames, Styles } from './enum';
import './profile-form.scss';
//

class ProfileForm extends BaseComponent {
  private form: HTMLFormElement;

  private fieldSetPersonal: FieldsetPersonal;

  private api: APIUserActions;

  private router: Router | null = null;

  constructor(
    api: APIUserActions,
    validatorEmail: EmailPasswordCheck,
    validatorAddress: AddressCheck
  ) {
    super();
    this.form = this.createElement(TagNames.FORM, Styles.FORM);

    this.fieldSetPersonal = new FieldsetPersonal(validatorEmail, validatorAddress);
    this.api = api;

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.form;
  }

  public setRouter(router: Router): void {
    this.router = router;
  }

  private createComponent(): void {
    const { form, fieldSetPersonal } = this;

    const fieldsetPersonalElement: HTMLElement = fieldSetPersonal.getElement();

    [fieldsetPersonalElement].forEach((el: HTMLElement): void => form.append(el));
  }

  // eslint-disable-next-line
}

export default ProfileForm;
