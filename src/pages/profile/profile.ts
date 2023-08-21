import TemplateView from '../template-view/template-view';
import { TagNames, Styles } from './enum';
import { API } from '../../api/api';
import './profile.scss';

class Profile extends TemplateView {
  private container: HTMLDivElement;

  private title: HTMLDivElement;

  private info: HTMLDivElement;

  private userInformation: HTMLDivElement;

  private userAddresses: HTMLDivElement;

  private documentTitle: string = 'Profile';

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.title = this.createElement(TagNames.DIV, Styles.TITLE);
    this.info = this.createElement(TagNames.DIV, Styles.INFO);
    this.userInformation = this.createElement(TagNames.DIV, Styles.USER_INFORMATION);
    this.userAddresses = this.createElement(TagNames.DIV, Styles.USER_ADRESSES);
    this.getUserData();

    this.createComponent();
  }

  private async getUserData(): Promise<void> {
    try {
      const api = new API();
      const userData = await api.getUserById();
      const firstName = userData.firstName;
      //   const lastName = userData.lastName;
      this.title.innerHTML = `Hi, ${firstName}`;
    } catch (error) {
      console.error('Error retrieving user data:', error);
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
