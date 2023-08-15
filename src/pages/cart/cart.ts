import TemplateView from '../template-view/template-view';
import './cart.scss';

export default class Cart extends TemplateView {
  constructor() {
    super();
    this.setTitle('Cart');
  }

  public async getHtml(): Promise<string> {
    return `<div class="cart">This is Cart page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
