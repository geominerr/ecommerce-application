import TemplateView from '../template-view/template-view';
import APICart from '../../api/cart-actions/api-cart-actions';
import LineItem from './line-item/line-item';
import EMPTY_CART from './empty-cart';
import { converteResponseCartData } from '../../utils/response-converter/response-converter';
import { TagNames, Styles, Content } from './enum';
import './cart.scss';

export default class Cart extends TemplateView {
  private apiCart = APICart;

  private documentTitle: string = 'Cart';

  private container: HTMLElement;

  private title: HTMLHeadElement;

  private lineItemContainer: HTMLElement;

  private buttonClearCart: HTMLElement;

  private buttonCatalog: HTMLAnchorElement;

  private buttonBuy: HTMLElement;

  private totalPrice: HTMLElement;

  private totalPriceDiscount: HTMLElement;

  private promoGroup: HTMLElement;

  private buttonGroup: HTMLElement;

  constructor() {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.title = this.createElement(TagNames.H2, Styles.TITLE);
    this.lineItemContainer = this.createElement(TagNames.DIV, Styles.LINE_ITEM_CONTAINER);
    this.buttonClearCart = this.createElement(TagNames.BUTTON, Styles.BTN);
    this.buttonCatalog = this.createElement(TagNames.A, Styles.BTN);
    this.buttonBuy = this.createElement(TagNames.BUTTON, Styles.BTN);
    this.totalPrice = this.createElement(TagNames.P, Styles.PRICE);
    this.totalPriceDiscount = this.createElement(TagNames.P, Styles.DISCOUNT_PRICE);
    this.promoGroup = this.createPromoGroup();
    this.buttonGroup = this.createButtonGroup();
    this.createComponent();
  }

  private createComponent(): void {
    const { container, title, lineItemContainer, promoGroup, buttonGroup } = this;

    title.innerText = Content.TITLE;
    [title, lineItemContainer, promoGroup, buttonGroup].forEach((el) => container.append(el));

    this.addClickHandler();
  }

  public async getHtml(): Promise<HTMLElement> {
    // под капотом обновление все полей, которые могут изменятся, продукты, общая цена и тд и тп
    await this.updateCart()
      .then(() => console.log('Ok'))
      .catch((err) => console.log(err));

    return this.container;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
  }

  private async updateCart(): Promise<void> {
    const { lineItemContainer, totalPrice, promoGroup, buttonGroup } = this;
    lineItemContainer.innerHTML = '';
    promoGroup.style.display = 'none';
    buttonGroup.style.display = 'none';

    try {
      const carData = await this.apiCart.getCart();

      if (carData) {
        const convertedData = converteResponseCartData(carData);
        totalPrice.innerText = convertedData.totalPrice;

        if (!convertedData.products.length) {
          lineItemContainer.innerHTML = EMPTY_CART;

          return;
        }

        promoGroup.style.display = 'flex';
        buttonGroup.style.display = 'flex';

        convertedData.products.forEach((product) => {
          const lineItem = new LineItem(product).getElement();
          lineItemContainer.append(lineItem);
        });
      }
    } catch {
      throw new Error('Cart fetch problem');
    }
  }

  private createButtonGroup(): HTMLElement {
    const { buttonCatalog, buttonClearCart } = this;
    const container = this.createElement(TagNames.DIV, Styles.BTN_GROUP);
    const orderGroup = this.createOrderGroup();

    buttonClearCart.classList.add(Styles.BTN_CLEAR);
    buttonCatalog.innerText = Content.BTN_CONTINUE;
    buttonClearCart.innerText = Content.BTN_CLEAR;
    buttonCatalog.href = '/catalog';
    [buttonCatalog, buttonClearCart, orderGroup].forEach((el) => container.append(el));

    return container;
  }

  private createOrderGroup(): HTMLElement {
    const { buttonBuy, totalPrice, totalPriceDiscount } = this;
    const container = this.createElement(TagNames.DIV, Styles.ORDER_GROUP);
    const priceWrapper = this.createElement(TagNames.DIV, Styles.PRICE_WRAPPER);

    buttonBuy.innerText = Content.BTN_ORDER;
    buttonBuy.classList.add(Styles.BTN_ORDER);

    [totalPrice, totalPriceDiscount].forEach((el) => priceWrapper.append(el));
    [priceWrapper, buttonBuy].forEach((el) => container.append(el));

    return container;
  }

  private createPromoGroup(): HTMLElement {
    const container = this.createElement(TagNames.DIV, Styles.PROMO_GROUP);
    container.innerText = 'PromoCode';
    return container;
  }

  private createElement<T extends HTMLElement>(tagName: string, style: string): T {
    const element: T = document.createElement(tagName) as T;
    element.classList.add(style);

    return element;
  }

  private addClickHandler(): void {
    this.container.addEventListener('click', (e) => {
      const { target } = e;

      if (target instanceof HTMLElement) {
        if (target.classList.contains(Styles.BTN_CLEAR)) {
          this.apiCart
            .removeCart()
            .then(() => this.updateCart().catch((err) => console.log(err)))
            .catch((err) => console.log(err));
        }

        if (target.innerText === 'Add product') {
          // сейчас харкод, будет id передаваться с карточки
          const IdProduct = 'f9adbb3d-f996-4d5d-acb7-736e96b3dfad';
          this.apiCart.addProductByID(IdProduct);
        }

        if (target.innerText === 'Get cart') {
          this.apiCart.getCart();
        }

        if (target.innerText === 'Remove') {
          // сейчас харкод, будет Lineid передаваться с корзины
          // const lineId = '8e16ce4f-e40b-4f41-9d7a-b1eb8b9e3c3b';
          // const quantity = 1;
          this.apiCart.removeDicsount('e599b6ef-be2e-484f-a439-b7dc2c23e590');
        }

        if (target.innerText === 'get Discount') {
          this.apiCart.addDicsount('max');
        }
      }
    });
  }
}
