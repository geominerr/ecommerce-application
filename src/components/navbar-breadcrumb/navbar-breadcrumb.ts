import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles } from './enum';
import './navbar-breadcrumb.scss';
import { ILinkOptions } from './navbar-breadcrumb-interfaces';

class NavbarBreadcrumb extends BaseComponent {
  private container: HTMLDivElement;

  constructor() {
    super();
    this.container = this.createElement(TagNames.NAV, Styles.NAVBAR);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  public clearContainer(): void {
    this.container.innerHTML = '';
  }

  public updateNavbar(options: ILinkOptions[]): void {
    const { container } = this;

    const homeLink = this.createLogo();
    const cataLogLink = this.createNavLink({ href: '/catalog', content: 'Catalog' });

    [homeLink, cataLogLink].forEach((el): void => container.append(el));
    options.forEach((option): void => container.append(this.createNavLink(option)));
  }

  private createNavLink(options: ILinkOptions): HTMLAnchorElement {
    const navLink: HTMLAnchorElement = this.createElement(TagNames.A, Styles.LINK);

    navLink.href = options.href;
    navLink.innerText = options.content;

    return navLink;
  }

  private createLogo(): HTMLElement {
    const logoWrapper: HTMLDivElement = this.createElement(TagNames.DIV, Styles.IMAGE_WRAPPER);
    const icon: HTMLImageElement = this.createElement(TagNames.IMG, Styles.IMAGE);
    const link: HTMLAnchorElement = this.createElement(TagNames.A, Styles.LINK);

    icon.src = '../../assets/icons/icon-home.png';
    link.href = '/';

    link.append(icon);
    logoWrapper.append(link);

    return logoWrapper;
  }
}

export default NavbarBreadcrumb;
