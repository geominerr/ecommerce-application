import TemplateView from '../template-view/template-view';
import ButtonPage from '../catalog/buttons/button/button';
import APICartActions from '../../api/cart-actions/api-cart-actions';
import './cart.scss';

export default class Cart extends TemplateView {
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

  private documentTitle: string = 'Cart';

  public async getHtml(): Promise<HTMLElement> {
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
          // сейчас харкод, будет id передаваться с карточки
          const IdProduct = 'f9adbb3d-f996-4d5d-acb7-736e96b3dfad';
          this.apiCart.addProductByID(IdProduct);
        }

        if (target.innerText === 'Get cart') {
          this.apiCart.getCart();
        }

        if (target.innerText === 'Remove') {
          // сейчас харкод, будет Lineid передаваться с корзины
          const lineId = '8e16ce4f-e40b-4f41-9d7a-b1eb8b9e3c3b';
          const quantity = 1;
          this.apiCart.removetByLineItemID(lineId, quantity);
        }
      }
    });
  }
}
