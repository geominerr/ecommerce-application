import BaseComponent from '../base/base-component/base-component';
import { TagNames, Styles } from './enum';
import './navbar-breadcrumb.scss';
import { ILinkOptions, IMapPaths } from './navbar-breadcrumb-interfaces';
import { MAP_PATHS } from './map-path';

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

  public updateFromPathname(): void {
    this.clearContainer();
    const { container } = this;

    const pathName = location.pathname;
    const title = pathName.split('/')[pathName.split('/').length - 1];
    const normalizedTitle = title[0].toUpperCase() + title.slice(1);
    let categoriaLink;

    const homeLink = this.createLogo();
    const cataLogLink = this.createNavLink({ href: '/catalog', content: 'Catalog' });

    [homeLink, cataLogLink].forEach((el): void => container.append(el));

    if (pathName !== '/catalog') {
      categoriaLink = this.createNavLink({ href: pathName, content: normalizedTitle });
      container.append(categoriaLink);
    }
  }

  public updateNavbar(key: string, end: string): void {
    const { container } = this;

    const homeLink = this.createLogo();
    const cataLogLink = this.createNavLink({ href: '/catalog', content: 'Catalog' });
    const options = this.createLinkOptions(key, end);

    [homeLink, cataLogLink].forEach((el): void => container.append(el));
    options.forEach((option): void => container.append(this.createNavLink(option)));
  }

  private createLinkOptions(key: string, end: string): ILinkOptions[] {
    const options: ILinkOptions[] = [];
    const normalizedKey = key.slice(0, 3).toLowerCase();
    console.log(normalizedKey);
    const optionCategoria = MAP_PATHS[normalizedKey as keyof IMapPaths];
    const optionEnd = { href: '/catalog', content: end };

    [optionCategoria, optionEnd].forEach((option) => options.push(option));

    return options;
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
