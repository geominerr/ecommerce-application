import { APIUserActions } from '../../api/api-user-actions';
import TemplateView from '../template-view/template-view';
import ProfileForm from '../../components/forms/profile-form/profile-form';
import { Router } from '../../router/router';
import { AddressCheck } from '../../utils/address_check';
import { EmailPasswordCheck } from '../../utils/email_password_check';
import { TagNames, Styles } from './enum';
import './profile.scss';

class Profile extends TemplateView {
  private container: HTMLDivElement;

  private title: HTMLDivElement;

  private info: HTMLDivElement;

  private profileForm: ProfileForm;

  // private userInformation: HTMLDivElement;

  // private userAddresses: HTMLDivElement;

  private documentTitle: string = 'Profile';

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor(api: APIUserActions, validator1: EmailPasswordCheck, validator2: AddressCheck) {
    super();
    this.profileForm = new ProfileForm(api, validator1, validator2);
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.title = this.createElement(TagNames.DIV, Styles.TITLE);
    this.info = this.createElement(TagNames.DIV, Styles.INFO);
    // this.userInformation = this.createElement(TagNames.DIV, Styles.USER_INFORMATION);
    // this.userAddresses = this.createElement(TagNames.DIV, Styles.USER_ADRESSES);

    this.createComponent();
    this.getUserData();
  }

  public async getUserData(): Promise<void> {
    try {
      const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
      const profileLink = navLinks.find((link) => link.getAttribute('href') === '/profile');

      const fetchUserData = async (): Promise<void> => {
        if (localStorage.getItem(this.keyAccessToken)) {
          const api = new APIUserActions();
          const userData = await api.getCustomer();
          const firstName = userData.firstName;
          this.title.innerHTML = `Hi ${firstName}`;
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

  public async getHtml(): Promise<string | HTMLElement> {
    return this.container;
  }

  public setRouter(router: Router): this {
    this.profileForm.setRouter(router);

    return this;
  }

  private createComponent(): void {
    const { container } = this;
    const registrationFormElement: HTMLElement = this.profileForm.getElement();
    // const { info } = this;

    container.append(this.title, this.info);
    this.info.append(registrationFormElement);
    // info.append(this.userInformation, this.userAddresses);
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }
}

export default Profile;
