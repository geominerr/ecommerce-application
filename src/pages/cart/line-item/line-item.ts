import BaseComponent from '../../../components/base/base-component/base-component';
import { ICartProduct } from './line-item-interfaces';
import { Styles, TagNames } from './enum';
import './line-item.scss';

class LineItem extends BaseComponent {
  private container: HTMLElement;

  private startHref: string = '/detail-product/';

  constructor(lineItemData: ICartProduct) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);

    this.createComponent(lineItemData);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private createComponent(data: ICartProduct): void {
    const { container } = this;
    const lineItem = this.createLineItem(data.productId, data.imageUrl, data.name);

    container.append(lineItem);
  }

  private createLineItem(productId: string, imgSrc: string, name: string): HTMLElement {
    const container: HTMLElement = this.createElement(TagNames.DIV, Styles.LINE_ITEM);
    const iconLink: HTMLAnchorElement = this.createElement(TagNames.A, Styles.IMG_LINK);
    const img: HTMLImageElement = this.createElement(TagNames.IMG, Styles.IMG);
    const navLink: HTMLAnchorElement = this.createElement(TagNames.A, Styles.LINK);

    img.src = imgSrc;
    iconLink.append(img);
    navLink.innerText = name;

    [iconLink, navLink].forEach((link) => {
      link.href = `${this.startHref}${productId}`;
      container.append(link);
    });

    return container;
  }
}

export default LineItem;
