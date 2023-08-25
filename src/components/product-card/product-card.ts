import BaseComponent from '../base/base-component/base-component';
import { Attributes, Content, Events, Styles, TagNames } from './enum';
import { ProductData } from './product-card-interfaces';
import './product-card.scss';

class ProductCard extends BaseComponent {
  private card: HTMLDivElement;

  private imgWrapper: HTMLDivElement;

  private img: HTMLImageElement;

  private title: HTMLHeadElement;

  private price: HTMLParagraphElement;

  private discountPrice: HTMLParagraphElement;

  private buttonCart: HTMLButtonElement;

  private hiddenLink: HTMLAnchorElement;

  private productData: ProductData;

  constructor(data: ProductData) {
    super();
    this.card = this.createElement(TagNames.DIV, Styles.CARD);
    this.imgWrapper = this.createElement(TagNames.DIV, Styles.IMG_WRAPPER);
    this.img = this.createElement(TagNames.IMG, Styles.IMG);
    this.title = this.createElement(TagNames.H4, Styles.TITLE);
    this.price = this.createElement(TagNames.P, Styles.PRICE);
    this.discountPrice = this.createElement(TagNames.P, Styles.PRICE_DISCOUNT);
    this.buttonCart = this.createElement(TagNames.P, Styles.BUTTON_CART);
    this.hiddenLink = this.createElement(TagNames.A, Styles.LINK);

    this.productData = data;

    this.createComponent(data);
  }

  public getElement(): HTMLElement {
    return this.card;
  }

  /*добавил ParentNode, чтобы при создании карточки каждый раз не вызывать querySelector**/
  private createComponent(data: ProductData): void {
    const { card, imgWrapper, img, title, price, discountPrice, buttonCart, hiddenLink } = this;

    hiddenLink.setAttribute(Attributes.HREF, `${Attributes.HREF_VALUE_DETAIL_PRODUCT}/${data.id}`);
    hiddenLink.setAttribute(Attributes.ID, data.id);

    img.src = data.img[0];
    title.innerText = data.name;
    price.innerText = data.price;
    buttonCart.innerText = Content.BUTTON_CART;

    if (data.discountPrice) {
      price.classList.add(Styles.PRICE_DISABLED);
      discountPrice.innerText = data.discountPrice;
    } else {
      // сейчас это чисто для примера, этого не будет если не будет discount
      price.classList.add(Styles.PRICE_DISABLED);
      discountPrice.innerText = '€ 777';
    }

    imgWrapper.append(img);
    [hiddenLink, imgWrapper, title, price, discountPrice, buttonCart].forEach(
      (el: HTMLElement): void => card.append(el)
    );

    this.addClickHandler();
  }

  // этот метод необходим для того чтобы вызывать клик на нашей ссылке невидимке ))
  private addClickHandler(): void {
    const { card, buttonCart, hiddenLink } = this;

    card.addEventListener(Events.CLICK, (e: Event): void => {
      const { target } = e;
      if (target !== buttonCart) {
        // только как теперь роуетру обьяснить куда идти )))
        hiddenLink.click(); // <= здесь мы принудительно вызываем клик, а наш роутер уже дальше сам в курсе что делать )))
      }
    });
  }
}

export default ProductCard;
