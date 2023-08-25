import BaseComponent from '../base/base-component/base-component';
import { Attributes, Content, Styles, TagNames } from './enum';
import { ProductData } from './product-card-interfaces';
import './product-card.scss';

class ProductCard extends BaseComponent {
  private productCard: HTMLElement;

  private container: HTMLElement;

  private link: HTMLAnchorElement;

  private productData: ProductData;

  constructor(data: ProductData) {
    super();
    this.productCard = this.createElement(TagNames.DIV, Styles.PRODUCT_CARD);
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.link = this.createElement(TagNames.A, Styles.LINK);

    this.productData = data;

    this.createComponent();
  }

  private createComponent(): void {
    const { productCard, container, link } = this;
    link.setAttribute(Attributes.HREF, Attributes.HREF_VALUE_DETAIL_PRODUCT);
    console.log(this.productData.id);

    link.innerText = Content.LINK_DETAIL;
    link.innerText = this.productData.name; // временно
    container.append(link);
    productCard.append(container);
    link.classList.add(String(this.productData.id));
    const catalogContainer = document.querySelector('.content');
    catalogContainer?.append(productCard);

    console.log('data in single card: ', this.productData);
  }
}

export default ProductCard;
