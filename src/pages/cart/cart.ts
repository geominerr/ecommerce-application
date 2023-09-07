import TemplateView from '../template-view/template-view';
import { APIAcceesToken } from '../../api/api-access-token'; // Удалить
import { IAnonymousResponse } from '../../api/api-interfaces';
import ButtonPage from '../catalog/buttons/button/button';
import APICartActions from '../../api/cart-actions/api-cart-actions';
import './cart.scss';

export default class Cart extends TemplateView {
  private api: APIAcceesToken; // Удалить

  private apiCart: APICartActions;

  private container: HTMLElement;

  private buttonCreateCart: ButtonPage;

  private buttonAddProduct: ButtonPage;

  private buttonGetCart: ButtonPage;

  private buttonRemoveProd: ButtonPage;

  constructor() {
    super();
    this.container = this.createElement('div', 'cart');
    this.buttonCreateCart = new ButtonPage('catalog');
    this.buttonAddProduct = new ButtonPage('catalog');
    this.buttonGetCart = new ButtonPage('catalog');
    this.buttonRemoveProd = new ButtonPage('catalog');
    this.createComponent();
    this.api = new APIAcceesToken(); // Удалить
    this.apiCart = new APICartActions();
  }

  private createComponent(): void {
    const { container, buttonAddProduct, buttonCreateCart, buttonGetCart, buttonRemoveProd } = this;
    const buttonCreate = buttonCreateCart.getElement();
    const buttonAdd = buttonAddProduct.getElement();
    const buttonGet = buttonGetCart.getElement();
    const buttonRemove = buttonRemoveProd.getElement();

    buttonCreate.innerText = 'Create cart';
    buttonAdd.innerText = 'Add product';
    buttonGet.innerText = 'Get cart';
    buttonRemove.innerText = 'Remove';

    [buttonCreate, buttonGet, buttonAdd, buttonRemove].forEach((el) => container.append(el));

    this.addClickHandler();
  }

  // Метод ниже исключительно для теста api. Его необходимо удалить по окончанию настройки.
  private async getAnon(): Promise<void> {
    const anon: IAnonymousResponse = await this.api.getAnonymousToken();
    console.log('anon: ', anon);

    const refresh = await this.api.refreshToken(anon.refresh_token);
    console.log('refreshed: ', refresh);
  }

  private documentTitle: string = 'Cart';

  public async getHtml(): Promise<HTMLElement> {
    this.getAnon();
    return this.container;
  }

  public setTitle(): void {
    document.title = this.documentTitle;
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
        if (target.innerText === 'Create cart') {
          this.apiCart.createCart();
        }

        if (target.innerText === 'Add product') {
          const IdProduct = 'f9adbb3d-f996-4d5d-acb7-736e96b3dfad';
          this.apiCart.addProductByID(IdProduct);
          // const newIdProd = '9dee7238-61a0-4169-8d30-fba328901517';
          // setTimeout(() => {
          //   this.apiCart.addProductByID(newIdProd);
          // }, 1000);

          //
        }

        if (target.innerText === 'Get cart') {
          this.apiCart.getCart();
        }

        if (target.innerText === 'Remove') {
          const lineId = '19c9866e-d693-41d2-9622-1cfc83d7eef4';
          const quantity = 1;
          this.apiCart.removetByLineItemID(lineId, quantity);
        }
      }
    });
  }
}
