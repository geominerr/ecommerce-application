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

  constructor() {
    super();
    this.container = this.createElement('div', 'cart');
    this.buttonCreateCart = new ButtonPage('catalog');
    this.buttonAddProduct = new ButtonPage('catalog');
    this.createComponent();
    this.api = new APIAcceesToken(); // Удалить
    this.apiCart = new APICartActions();
  }

  private createComponent(): void {
    const { container, buttonAddProduct, buttonCreateCart } = this;
    const buttonCreate = buttonCreateCart.getElement();
    const buttonAdd = buttonAddProduct.getElement();

    buttonCreate.innerText = 'Create cart';
    buttonAdd.innerText = 'Add product';

    [buttonCreate, buttonAdd].forEach((el) => container.append(el));

    this.addClickHandler(buttonCreateCart.getElement());
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

  private addClickHandler(createCart: HTMLElement): void {
    createCart.addEventListener('click', () => {
      this.apiCart.createCart();
    });
  }
}
