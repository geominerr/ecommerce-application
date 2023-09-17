import BaseComponent from '../base/base-component/base-component';
import { Attributes, Events, Styles, TagNames } from './enum';
import { ILinkOptions } from './header-interfaces';
import { LINKS_OPTIONS, LINKS_OPTIONS_USER, LOGO_OPTIONS } from './link-options';
import { popupDiscount } from '../../utils/popup_discount-codes';
import './header.scss';

class Header extends BaseComponent {
  private header: HTMLHeadingElement;

  private container: HTMLDivElement;

  private logo: HTMLElement;

  private navigation: HTMLElement;

  private burgerIcon: HTMLDivElement;

  constructor() {
    super();
    this.header = this.createElement(TagNames.HEADER, Styles.HEADER);
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.logo = this.createElement(TagNames.DIV, Styles.LOGO_WRAPPER);
    this.navigation = this.createElement(TagNames.NAV, Styles.NAV);
    this.burgerIcon = this.createElement(TagNames.DIV, Styles.BURGER);

    this.createComponent();
  }

  private createComponent(): void {
    const { header, container } = this;

    const logo: HTMLElement = this.createLogo();
    const navigation: HTMLElement = this.createNavigation();
    const burgerIcon: HTMLElement = this.createBurgerIcon();

    [logo, navigation, burgerIcon].forEach((el: HTMLElement): void => container.append(el));
    header.append(container);

    this.addClickHandler();
    document.body.append(header);
  }

  private createBurgerIcon(): HTMLElement {
    const { burgerIcon } = this;

    for (let i = 0; i < 3; i += 1) {
      const burgerLine: HTMLSpanElement = this.createElement(TagNames.SPAN, Styles.BURGER_LINE);

      burgerIcon.append(burgerLine);
    }

    return burgerIcon;
  }

  private createNavigation(): HTMLElement {
    const { navigation } = this;
    const productLinks: HTMLElement = this.createElement(TagNames.DIV, Styles.NAV_PRODUCTS);
    const userLinks: HTMLElement = this.createElement(TagNames.DIV, Styles.NAV_USER);
    const dicounts: HTMLButtonElement = this.createElement(TagNames.BUTTON, Styles.PROMO_BUTTON);
    dicounts.innerText = 'Discounts';

    LINKS_OPTIONS.forEach((option: ILinkOptions): void => {
      const link = this.createNavLink(option);

      productLinks.append(dicounts, link);
    });

    LINKS_OPTIONS_USER.forEach((option: ILinkOptions): void => {
      const link = this.createNavLink(option);

      userLinks.append(link);
    });

    [productLinks, userLinks].forEach((el: HTMLElement): void => navigation.append(el));

    return navigation;
  }

  private createNavLink(options: ILinkOptions): HTMLAnchorElement | HTMLElement {
    const navLink: HTMLAnchorElement = this.createElement(TagNames.A, Styles.LINK);
    navLink.setAttribute(Attributes.HREF, options.href);

    if (options.content) {
      navLink.innerText = options.content;
    }

    if (options.imgPath) {
      const img: HTMLImageElement = this.createElement(TagNames.IMG, Styles.IMAGE);
      img.setAttribute(Attributes.SRC, options.imgPath);

      navLink.append(img);

      if (options.href === '/cart') {
        const cartWrapper = this.createElement(TagNames.DIV, Styles.CART_WRAPPER);
        const counterProduct = this.createElement(TagNames.DIV, Styles.PRODUCT_COUNTER);
        [counterProduct, navLink].forEach((el: HTMLElement): void => cartWrapper.append(el));

        return cartWrapper;
      }
    }

    return navLink;
  }

  private createLogo(): HTMLElement {
    const { logo } = this;
    const link = this.createNavLink(LOGO_OPTIONS);

    logo.append(link);

    return logo;
  }

  private addClickHandler(): void {
    const { burgerIcon, navigation } = this;

    document.addEventListener(Events.CLICK, (e: Event): void => {
      const { target } = e;

      if (target instanceof HTMLElement) {
        if (
          (target === burgerIcon || target.classList.contains(Styles.BURGER_LINE)) &&
          !burgerIcon.classList.contains(Styles.BURGER_ACTIVE)
        ) {
          burgerIcon.classList.add(Styles.BURGER_ACTIVE);
          navigation.classList.add(Styles.NAV_OPEN);
        } else {
          burgerIcon.classList.remove(Styles.BURGER_ACTIVE);
          navigation.classList.remove(Styles.NAV_OPEN);
        }
      }

      if (target instanceof HTMLButtonElement && target.classList[0] === 'promo-button') {
        popupDiscount();
      }
    });
  }
}

export default Header;
