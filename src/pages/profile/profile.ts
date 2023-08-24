import TemplateView from '../template-view/template-view';
import { TagNames, Styles } from './enum';
import { APIUserActions } from '../../api/api-user-actions';
import './profile.scss';

class Profile extends TemplateView {
  private container: HTMLDivElement;

  private title: HTMLDivElement;

  private info: HTMLDivElement;

  private userInformation: HTMLDivElement;

  private userAddresses: HTMLDivElement;

  private documentTitle: string = 'Profile';

  private keyAccessToken: string = '_cyber_(^-^)_punk_A';

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.title = this.createElement(TagNames.DIV, Styles.TITLE);
    this.info = this.createElement(TagNames.DIV, Styles.INFO);
    this.userInformation = this.createElement(TagNames.DIV, Styles.USER_INFORMATION);
    this.userAddresses = this.createElement(TagNames.DIV, Styles.USER_ADRESSES);

    this.createComponent();
    this.getUserData();
  }

  public async getUserData(): Promise<void> {
    try {
      const navLinks = Array.from(document.querySelectorAll('a.nav-link'));
      const profileLink = navLinks.find((link) => link.getAttribute('href') === '/profile');

      if (profileLink) {
        profileLink.addEventListener('click', async (event) => {
          event.preventDefault();

          if (localStorage.getItem(this.keyAccessToken)) {
            const api = new APIUserActions();
            const userData = await api.getCustomer();
            const firstName = userData.firstName;
            this.title.innerHTML = firstName;
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch customer data:', error);
    }
  }

  public async getHtml(): Promise<string | HTMLElement> {
    return this.container;
  }

  private createComponent(): void {
    const { container } = this;
    const { info } = this;

    container.append(this.title, this.info);
    info.append(this.userInformation, this.userAddresses);
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
