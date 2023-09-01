import BaseComponent from '../base/base-component/base-component';
import LINKS_OPTIONS from './link-options';
import { ILinkOptionsNav } from './navbar-interfaces';
import { Styles, TagNames } from './enum';
import './navbar.scss';

class Navbar extends BaseComponent {
  private navbar: HTMLElement;

  private links: HTMLAnchorElement[] = [];

  constructor() {
    super();
    this.navbar = this.createElement(TagNames.NAV, Styles.NAVBAR);

    this.createComponent();
  }

  public getElement(): HTMLElement {
    return this.navbar;
  }

  public updateStateLinks(): void {
    const categoriaNameArr = location.pathname.split('/');
    const categoriaName = categoriaNameArr[categoriaNameArr.length - 1];

    this.links.forEach((link) => {
      if (link.id === categoriaName) {
        link.classList.add(Styles.LINK_ACTIVE);
      } else {
        link.classList.remove(Styles.LINK_ACTIVE);
      }
    });
  }

  private createComponent(): void {
    const { navbar, links } = this;

    LINKS_OPTIONS.forEach((option) => {
      const link: HTMLAnchorElement = this.createNavLink(option);

      navbar.append(link);
      links.push(link);
    });

    this.addClickHandler();
  }

  private createNavLink(options: ILinkOptionsNav): HTMLAnchorElement {
    const navLink: HTMLAnchorElement = this.createElement(TagNames.A, Styles.LINK);

    navLink.setAttribute('id', options.id);
    navLink.setAttribute('href', options.href);

    if (options.content) {
      navLink.innerText = options.content;
    }

    return navLink;
  }

  private addClickHandler(): void {
    const { navbar, links } = this;

    navbar.addEventListener('click', (e) => {
      const { target } = e;

      if (target instanceof HTMLAnchorElement) {
        links.forEach((el) => {
          el.classList.remove(Styles.LINK_ACTIVE);
        });
        target.classList.add(Styles.LINK_ACTIVE);
      }
    });
  }
}

export default Navbar;
