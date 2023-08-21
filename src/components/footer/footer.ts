import BaseComponent from '../base/base-component/base-component';
import { Attributes, Content, Styles, TagNames } from './enum';
import './footer.scss';

class Footer extends BaseComponent {
  private footer: HTMLElement;

  private container: HTMLElement;

  private link: HTMLAnchorElement;

  constructor() {
    super();
    this.footer = this.createElement(TagNames.FOOTER, Styles.FOOTER);
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.link = this.createElement(TagNames.A, Styles.LINK);

    this.createComponent();
  }

  private createComponent(): void {
    const { footer, container, link } = this;
    link.setAttribute(Attributes.HREF, Attributes.HREF_VALUE_ABOUT_US);
    link.innerText = Content.LINK_ABOUT_US;

    container.append(link);
    footer.append(container);
    document.body.append(footer);
  }
}

export default Footer;
