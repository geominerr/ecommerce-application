import { APIUserActions } from '../../api/api-user-actions';
import TemplateView from '../template-view/template-view';
import ProfileForm from '../../components/forms/profile-form/profile-form';
import { Router } from '../../router/router';
import { AddressCheck } from '../../utils/address_check';
import { EmailPasswordCheck } from '../../utils/email_password_check';
import { TagNames, Styles, Content } from './enum';
import './profile.scss';

class Profile extends TemplateView {
  private container: HTMLDivElement;

  private title: HTMLDivElement;

  private info: HTMLDivElement;

  private profileForm: ProfileForm;

  private documentTitle: string = 'Profile';

  constructor(api: APIUserActions, validator1: EmailPasswordCheck, validator2: AddressCheck) {
    super();
    this.profileForm = new ProfileForm(api, validator1, validator2);
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.title = this.createElement(TagNames.DIV, Styles.TITLE, Content.PROFILE);
    this.info = this.createElement(TagNames.DIV, Styles.INFO);

    this.createComponent();
  }

  public async getHtml(): Promise<string | HTMLElement> {
    return this.container;
  }

  public setRouter(router: Router): this {
    this.profileForm.setRouter(router);

    return this;
  }

  private createComponent(): void {
    const { container } = this;
    const profileFormElement: HTMLElement = this.profileForm.getElement();

    container.append(this.title, this.info);
    this.info.append(profileFormElement);
  }

  private createElement<T extends HTMLElement>(
    tagName: string,
    style: string,
    content?: string
  ): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);
    if (content) {
      element.innerHTML = content;
    }

    return element;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}

export default Profile;
