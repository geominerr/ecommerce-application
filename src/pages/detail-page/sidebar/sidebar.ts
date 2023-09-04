import BaseComponent from '../../../components/base/base-component/base-component';
import { Content, Events, Styles, TagNames } from './enum';
import { IProductAttribute, IProductData } from './sidebar-interfaces';
import './sidebar.scss';

class Sidebar extends BaseComponent {
  private container: HTMLDivElement;

  private title: HTMLHeadElement;

  private buttonBuy: HTMLButtonElement;

  private buttonCredit: HTMLButtonElement;

  constructor(data: IProductData) {
    super();
    this.container = this.createElement(TagNames.DIV, Styles.SIDEBAR);
    this.title = this.createElement(TagNames.DIV, Styles.TITLE);
    this.buttonBuy = this.createElement(TagNames.DIV, Styles.BUTTON);
    this.buttonCredit = this.createElement(TagNames.DIV, Styles.BUTTON);

    this.createComponent(data);
  }

  public getElement(): HTMLElement {
    return this.container;
  }

  private createComponent(data: IProductData): void {
    const { container, title, buttonBuy, buttonCredit } = this;

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

    this.addClickHandler(buttonBuy, buttonCredit);

    [buttonBuy, buttonCredit].forEach((el) => buttonWrapper.append(el));
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

  private addClickHandler(buttonBuy: HTMLElement, buttonCredit: HTMLElement): void {
    buttonBuy.addEventListener(Events.CLICK, () => {
      /// add to cart
    });

    buttonCredit.addEventListener(Events.CLICK, () => {
      /// does something  :-)
    });
  }
}

export default Sidebar;
