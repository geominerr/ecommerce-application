import BaseComponent from '../base/base-component/base-component';
import { Attributes, Content, Events, Styles, TagNames } from './enum';
import { ProductData } from './product-card-interfaces';
import APICart from '../../api/cart-actions/api-cart-actions';
import productMap from '../../utils/product-map/product-map';
import './product-card.scss';

class ProductCard extends BaseComponent {
  private productMap = productMap;

  private apiCart = APICart;

  private card: HTMLDivElement;

  private imgWrapper: HTMLDivElement;

  private img: HTMLImageElement;

  private title: HTMLHeadElement;

  private priceWrapper: HTMLDivElement;

  private price: HTMLParagraphElement;

  private discountPrice: HTMLParagraphElement;

  private buttonCart: HTMLButtonElement;

  private description: HTMLElement;

  private hiddenLink: HTMLAnchorElement;

  private productData: ProductData;

  constructor(data: ProductData) {
    super();
    this.card = this.createElement(TagNames.DIV, Styles.CARD);
    this.imgWrapper = this.createElement(TagNames.DIV, Styles.IMG_WRAPPER);
    this.img = this.createElement(TagNames.IMG, Styles.IMG);
    this.title = this.createElement(TagNames.H4, Styles.TITLE);
    this.priceWrapper = this.createElement(TagNames.DIV, Styles.PRICE_WRAPPER);
    this.price = this.createElement(TagNames.P, Styles.PRICE);
    this.discountPrice = this.createElement(TagNames.P, Styles.PRICE_DISCOUNT);
    this.description = this.createElement(TagNames.DIV, Styles.DESCRIPTION);
    this.buttonCart = this.createElement(TagNames.P, Styles.BUTTON_CART);
    this.hiddenLink = this.createElement(TagNames.A, Styles.LINK);

    this.productData = data;

    this.createComponent(data);
  }

  public getElement(): HTMLElement {
    return this.card;
  }

  private createComponent(data: ProductData): void {
    const { card, imgWrapper, img, title, buttonCart, hiddenLink } = this;
    const { priceWrapper, price, discountPrice, description } = this;

    hiddenLink.setAttribute(Attributes.HREF, `${Attributes.HREF_VALUE_DETAIL_PRODUCT}/${data.id}`);
    hiddenLink.setAttribute(Attributes.ID, data.id);

    img.src = data.img[0];
    title.innerText = data.name;
    price.innerText = data.price;
    buttonCart.innerText = Content.BUTTON_CART;
    description.innerText = data.description;

    if (productMap.hasProduct(data.id)) {
      buttonCart.classList.add(Styles.BUTTON_FULL_CART);
      buttonCart.innerText = 'Added';
    }

    if (data.discountPrice) {
      price.classList.add(Styles.PRICE_DISABLED);
      discountPrice.innerText = data.discountPrice;
    }

    imgWrapper.append(img);
    [price, discountPrice].forEach((el: HTMLElement): void => priceWrapper.append(el));
    [hiddenLink, imgWrapper, title, priceWrapper, description, buttonCart].forEach(
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
        hiddenLink.click(); // <= здесь мы принудительно вызываем клик, а наш роутер уже дальше сам в курсе что делать )))
      } else if (!buttonCart.classList.contains(Styles.BUTTON_FULL_CART)) {
        this.apiCart
          .addProductByID(this.productData.id)
          .then((lineItemId) => {
            this.productMap.setProduct(this.productData.id, lineItemId);
            buttonCart.classList.add(Styles.BUTTON_FULL_CART);
            buttonCart.innerText = 'Added';
          })
          .catch((err) => console.log(err));
      }
    });
  }
}

export default ProductCard;
