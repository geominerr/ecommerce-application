import BaseComponent from '../../../components/base/base-component/base-component';
import { ICartProduct } from './line-item-interfaces';
import { Content, Styles, TagNames } from './enum';
import APICart from '../../../api/cart-actions/api-cart-actions';
import productMap from '../../../utils/product-map/product-map';
import './line-item.scss';

class LineItem extends BaseComponent {
  private apiCart = APICart;

  private productMap = productMap;

  private container: HTMLElement;

  private startHref: string = '/detail-product/';

  private buttonRemove: HTMLElement;

  private inputCounter: HTMLInputElement;

  private buttonPlus: HTMLElement;

  private buttonMinus: HTMLElement;

  private productId: string;

  private lineItemId: string;

  private updateCart: () => Promise<void>;

  // при создании прокидываем callback-ом метод cart-page updateCart()
  constructor(lineItemData: ICartProduct, updateCart: () => Promise<void>) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.CONTAINER);
    this.buttonRemove = this.createElement(TagNames.DIV, Styles.BTN_REMOVE);
    this.buttonPlus = this.createElement(TagNames.DIV, Styles.BTN_PLUS);
    this.buttonMinus = this.createElement(TagNames.DIV, Styles.BTN_MINUS);
    this.inputCounter = this.createElement(TagNames.INPUT, Styles.INPUT);
    this.updateCart = updateCart;
    this.productId = lineItemData.productId;
    this.lineItemId = lineItemData.lineItemId;

    this.createComponent(lineItemData);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private createComponent(data: ICartProduct): void {
    const { container } = this;
    const lineItem = this.createLineItem(data.productId, data.imageUrl, data.name);
    const actionsGroup = this.createActionsGroup(data);

    [lineItem, actionsGroup].forEach((el) => container.append(el));
    this.addClickHandler();
    this.addInputHandler();
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

  private createActionsGroup(itemData: ICartProduct): HTMLElement {
    const { buttonRemove } = this;
    const container = this.createElement(TagNames.DIV, Styles.ACTIONS_GROUP);
    const priceContaner = this.createElement(TagNames.DIV, Styles.PRICE_GROUP);
    const counterGroup = this.createCounterGroup(itemData.quantity);
    const priceGroup = this.createPriceGroup(itemData.price, itemData.discountPrice);
    const priceTotalGroup = this.createTotalPriceGroup(
      itemData.totalPrice,
      itemData.totalDiscountedPrice
    );

    buttonRemove.innerText = Content.REMOVE_BTN;
    [priceGroup, counterGroup, priceTotalGroup].forEach((el) => priceContaner.append(el));
    [buttonRemove, priceContaner].forEach((el) => container.append(el));
    return container;
  }

  private createPriceGroup(price: string, discountPrice: string | undefined): HTMLElement {
    const container = this.createElement(TagNames.DIV, Styles.PRICE_WRAPPER);
    const priceEl = this.createElement(TagNames.DIV, Styles.PRICE);
    priceEl.innerText = price;

    container.append(priceEl);

    if (discountPrice) {
      priceEl.classList.add(Styles.PRICE_DISABLE);

      const discountPriceEl = this.createElement(TagNames.DIV, Styles.PRICE_DISCOUNT);
      discountPriceEl.innerText = discountPrice;

      container.append(discountPriceEl);
    }

    return container;
  }

  private createTotalPriceGroup(
    price: string | undefined,
    discountPrice: string | undefined
  ): HTMLElement {
    const container = this.createElement(TagNames.DIV, Styles.TOTAL_PRICE_WRAPPER);
    const priceEl = this.createElement(TagNames.DIV, Styles.TOTAL_PRICE);

    if (price) {
      priceEl.innerText = price;
    }

    container.append(priceEl);

    if (discountPrice) {
      priceEl.classList.add(Styles.PRICE_DISABLE);

      const discountPriceEl = this.createElement(TagNames.DIV, Styles.TOTAL_DISCOUNT);
      discountPriceEl.innerText = discountPrice;

      container.append(discountPriceEl);
    }

    return container;
  }

  private createCounterGroup(quantity: number): HTMLElement {
    const { buttonMinus, buttonPlus, inputCounter } = this;
    const container = this.createElement(TagNames.DIV, Styles.INPUT_WRAPPER);
    inputCounter.type = 'number';
    inputCounter.min = '1';
    inputCounter.max = '100';
    inputCounter.value = `${quantity}`;

    if (quantity <= 1) {
      buttonMinus.classList.add(Styles.BTN_DISABLE_MINUS);
    }

    if (quantity >= 25) {
      buttonPlus.classList.add(Styles.BTN_DISABLE_PLUS);
    }

    [buttonMinus, inputCounter, buttonPlus].forEach((el) => container.append(el));

    return container;
  }

  // ограничение на минимальное число 1 максимальное 25 можно ввести в input
  private addClickHandler(): void {
    const { container, buttonRemove, buttonMinus, buttonPlus } = this;
    const { productId, lineItemId } = this;

    container.addEventListener('click', (e: Event) => {
      const { target } = e;
      if (target === buttonRemove) {
        this.apiCart
          .changeAmountByLineItemID(lineItemId, 0)
          .then(() => {
            this.productMap.removeProduct(productId);
            this.updateCart();
          })
          .catch((err) => console.log(err));
      }
      if (target === buttonMinus) {
        let value = Number(this.inputCounter.value);
        if (value) {
          if (value > 1) {
            value -= 1;
            this.apiCart
              .changeAmountByLineItemID(lineItemId, value)
              .then(() => this.updateCart())
              .catch((err) => console.log(err));
          }
        }
      }
      if (target === buttonPlus) {
        let value = Number(this.inputCounter.value);
        if (value) {
          value = value >= 25 ? 25 : (value += 1);
          this.apiCart
            .changeAmountByLineItemID(lineItemId, value)
            .then(() => this.updateCart())
            .catch((err) => console.log(err));
        }
      }
    });
  }

  private addInputHandler(): void {
    const { inputCounter, lineItemId } = this;

    inputCounter.addEventListener('change', () => {
      let value = Number(inputCounter.value);

      if (value) {
        value = value >= 25 ? 25 : value;
        this.apiCart
          .changeAmountByLineItemID(lineItemId, value)
          .then(() => {
            this.updateCart();
          })
          .catch((err) => console.log(err));
      } else {
        value = 1;
        this.apiCart
          .changeAmountByLineItemID(lineItemId, value)
          .then(() => {
            this.updateCart();
          })
          .catch((err) => console.log(err));
      }
    });
  }
}

export default LineItem;
