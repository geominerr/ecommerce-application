import BaseComponent from '../base/base-component/base-component';
import { Attributes, Content, Styles, TagNames } from './enum';
import { popupDiscount } from '../../utils/popup_discount-codes';
import './footer.scss';

class Footer extends BaseComponent {
  private footer: HTMLElement;

  private container: HTMLElement;

  private link: HTMLAnchorElement;

  private dicountCodeRequest: HTMLButtonElement;

  constructor() {
    super();
    this.footer = this.createElement(TagNames.FOOTER, Styles.FOOTER);
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.link = this.createElement(TagNames.A, Styles.LINK);
    this.dicountCodeRequest = this.createElement(TagNames.BUTTON, Styles.PROMO_BUTTON);

    this.createComponent();
    this.addHandler();
  }

  private createComponent(): void {
    const { footer, container, link, dicountCodeRequest } = this;
    link.setAttribute(Attributes.HREF, Attributes.HREF_VALUE_ABOUT_US);
    link.innerText = Content.LINK_ABOUT_US;
    dicountCodeRequest.innerText = Content.PROMO_BUTTON;

    container.append(link);
    container.append(dicountCodeRequest);
    footer.append(container);
    document.body.append(footer);
  }

  private addHandler(): void {
    this.dicountCodeRequest.addEventListener('click', () => {
      popupDiscount();
    });

    // Эта конструкция слушает кнопку на главной странице.
    document.addEventListener('click', (e: Event): void => {
      const { target } = e;
      if (
        target instanceof HTMLElement &&
        (target.classList[0] === 'get-discounts' || target.classList[0] === 'learn-more')
      ) {
        popupDiscount();
      }
    });
  }
}

export default Footer;
