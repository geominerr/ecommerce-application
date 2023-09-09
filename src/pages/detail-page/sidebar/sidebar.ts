import BaseComponent from '../../../components/base/base-component/base-component';
import { Content, Events, Styles, TagNames } from './enum';
import { IProductAttribute, IProductData } from './sidebar-interfaces';
import productMap from '../../../utils/product-map/product-map';
import APICart from '../../../api/cart-actions/api-cart-actions';
import './sidebar.scss';

class Sidebar extends BaseComponent {
  private productMap = productMap;

  private apiCart = APICart;

  private container: HTMLDivElement;

  private title: HTMLHeadElement;

  private buttonBuy: HTMLButtonElement;

  private buttonCredit: HTMLButtonElement;

  private buttonRemove: HTMLButtonElement;

  private productData: IProductData;

  constructor(data: IProductData) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.SIDEBAR);
    this.title = this.createElement(TagNames.DIV, Styles.TITLE);
    this.buttonBuy = this.createElement(TagNames.DIV, Styles.BUTTON);
    this.buttonCredit = this.createElement(TagNames.DIV, Styles.BUTTON);
    this.buttonRemove = this.createElement(TagNames.DIV, Styles.BUTTON);

    this.productData = data;

    this.createComponent(data);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private createComponent(data: IProductData): void {
    const { container, title, buttonBuy, buttonCredit, buttonRemove } = this;

    const prices: string[] = [data.price];

    if (data.discountPrice) {
      prices.push(data.discountPrice);
    }

    const buttonWrapper: HTMLElement = this.createElement(TagNames.DIV, Styles.BUTTON_WRAPPER);
    const productWrapper: HTMLElement = this.createElement(TagNames.DIV, Styles.PRODUCT);
    const reviewStars: HTMLElement = this.createReviewStars();
    const price: HTMLElement = this.createPrice(prices);
    const description: HTMLElement = this.createDescription(data.description);
    const attributeList: HTMLElement = this.createAttributesList(data.attributes);

    title.innerText = data.title;
    buttonBuy.innerText = Content.BUTTON_BUY;
    buttonCredit.innerText = Content.BUTTON_CREDIT;
    buttonCredit.classList.add(Styles.BUTTON_CREDIT);
    buttonRemove.innerText = Content.BUTTON_REMOVE;
    buttonRemove.classList.add(Styles.BUTTON_REMOVE);
    buttonRemove.style.display = 'none';

    if (productMap.hasProduct(data.id)) {
      buttonRemove.style.display = 'block';
      buttonCredit.style.display = 'none';
      buttonBuy.classList.add(Styles.BUTTON_DISABLED);
      buttonBuy.innerText = 'Added';
    }

    this.addClickHandler(buttonBuy, buttonCredit, buttonRemove);

    [buttonBuy, buttonCredit, buttonRemove].forEach((el) => buttonWrapper.append(el));
    [title, reviewStars, price, buttonWrapper].forEach((el) => productWrapper.append(el));
    [productWrapper, attributeList, description].forEach((el) => container.append(el));
  }

  private createAttributesList(attributes: IProductAttribute[]): HTMLElement {
    const container: HTMLElement = this.createElement(TagNames.DIV, Styles.ATTRIBUTES);
    const title: HTMLElement = this.createElement(TagNames.H4, Styles.ATTRIBUTES_TITLE);

    title.innerText = Content.TITLE_ATTRIBUTES;
    container.append(title);

    attributes.forEach((attribute) => container.append(this.createAttributeItem(attribute)));

    return container;
  }

  private createAttributeItem(attribute: IProductAttribute): HTMLElement {
    const item: HTMLElement = this.createElement(TagNames.DIV, Styles.ATTRIBUTES_ITEM_WRAP);
    const itemName: HTMLElement = this.createElement(TagNames.P, Styles.ATTRIBUTES_NAME);
    const nameDecor: HTMLElement = this.createElement(TagNames.DIV, Styles.ATTRIBUTES_NAME_DECOR);
    const nameWrapper: HTMLElement = this.createElement(TagNames.DIV, Styles.ATTRIBUTES_NAME_WRAP);
    const itemValue: HTMLElement = this.createElement(TagNames.P, Styles.ATTRIBUTES_VALUE);

    itemName.innerText = attribute.name;
    itemValue.innerText = attribute.value;

    [itemName, nameDecor].forEach((el) => nameWrapper.append(el));
    [nameWrapper, itemValue].forEach((el) => item.append(el));

    return item;
  }

  private createPrice(prices: string[]): HTMLElement {
    const priceWrapper: HTMLElement = this.createElement(TagNames.DIV, Styles.PRICE_WRAPPER);
    const price: HTMLElement = this.createElement(TagNames.DIV, Styles.PRICE);
    const discountPrice: HTMLElement = this.createElement(TagNames.DIV, Styles.PRICE_DISCOUNT);

    price.innerText = prices[0];

    if (prices[1]) {
      discountPrice.innerText = prices[1];
      price.classList.add(Styles.PRICE_DISABLED);
    }

    [price, discountPrice].forEach((el) => priceWrapper.append(el));

    return priceWrapper;
  }

  private createDescription(content: string): HTMLElement {
    const container: HTMLElement = this.createElement(TagNames.DIV, Styles.DESCRIPTION);
    const title: HTMLElement = this.createElement(TagNames.H4, Styles.DESCRIPTION_TITLE);
    const description: HTMLElement = this.createElement(TagNames.P, Styles.DESCRIPTION_TEXT);

    title.innerText = Content.TITLE_DESCRIPTION;
    description.innerText = content;

    [title, description].forEach((el) => container.append(el));

    return container;
  }

  private createReviewStars(): HTMLElement {
    const container: HTMLElement = this.createElement(TagNames.DIV, Styles.STARS_WRAPPER);

    for (let i = 0; i < 5; i += 1) {
      const star: HTMLElement = this.createElement(TagNames.DIV, Styles.STAR);
      star.innerHTML = '&#9733;';

      if (i < 4) {
        star.classList.add(Styles.STAR_ACTIVE);
      }

      container.append(star);
    }

    return container;
  }

  private addClickHandler(
    buttonBuy: HTMLElement,
    buttonCredit: HTMLElement,
    buttonRemove: HTMLElement
  ): void {
    buttonBuy.addEventListener(Events.CLICK, () => {
      if (!buttonBuy.classList.contains(Styles.BUTTON_DISABLED)) {
        this.apiCart
          .addProductByID(this.productData.id)
          .then((lineItemID) => {
            this.productMap.setProduct(this.productData.id, lineItemID);

            buttonBuy.classList.add(Styles.BUTTON_DISABLED);
            buttonCredit.style.display = 'none';
            buttonRemove.style.display = 'block';
          })
          .catch((err) => console.log(err));
      }
    });

    buttonRemove.addEventListener(Events.CLICK, () => {
      if (this.productMap.hasProduct(this.productData.id)) {
        const lineItemId = this.productMap.getLineItemId(this.productData.id);

        this.apiCart
          .changeAmountByLineItemID(lineItemId, 0)
          .then(() => {
            this.productMap.removeProduct(this.productData.id);

            buttonBuy.classList.remove(Styles.BUTTON_DISABLED);
            buttonBuy.innerText = Content.BUTTON_BUY;
            buttonCredit.style.display = 'block';
            buttonRemove.style.display = 'none';
          })
          .catch((err) => console.log(err));
      }
    });
  }
}

export default Sidebar;
